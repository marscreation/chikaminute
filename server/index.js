import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";

// routes
import AuthRoute from "./src/routes/AuthRoute.js";
import UserRoute from "./src/routes/UserRoute.js";
import ChatRoute from "./src/routes/ChatRoute.js";
import MessageRoute from "./src/routes/MessageRoute.js";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT;
const CONNECTION = process.env.MONGODB_CONNECTION;
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"],
    },
});

let activeUsers = [];

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose
    .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Listening at Port ${PORT}`));
        server.listen(3001, () => console.log("Socket server running 3001"));
    })
    .catch((error) => console.log(`${error} did not connect`));

io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);

    socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id,
            });
        }
        console.log("Connected users", activeUsers)
        io.emit("get-users", activeUsers);
    });
    
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers)
        io.emit("get-users", activeUsers);
    });

    socket.on("send_message", (data) => {
        const {receiverId} = data
        const user = activeUsers.find(user => user.userId === receiverId)
        console.log("Send to ", receiverId);
        console.log("Data", data);
        if (user) {
            io.to(user.socketId).emit("receive_message", data)
        }
    //     // broadcast to all - no room yet
    //     socket.broadcast.emit("receive_message", data);

    //     // send to specific
    //     // socket.to(data.room).emit("receive_message", data);
    });
});

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
