import { Server } from "socket.io";

let io;

export function configSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("new-user-add", (newUserId) => {
            if (!global.activeUsers.some((user) => user.userId === newUserId)) {
                global.activeUsers.push({
                    userId: newUserId,
                    socketId: socket.id,
                });
            }
            console.log("Connected users", global.activeUsers);
            io.emit("get-users", global.activeUsers);
        });

        socket.on("disconnect", () => {
            global.activeUsers = global.activeUsers.filter(
                (user) => user.socketId !== socket.id
            );
            console.log("User Disconnected", global.activeUsers);
            io.emit("get-users", global.activeUsers);
        });

        socket.on("send_message", (data) => {
            const { receiverId } = data;
            const user = global.activeUsers.find((user) => user.userId === receiverId);
            console.log("Send to ", receiverId);
            console.log("Data", data);
            if (user) {
                io.to(user.socketId).emit("receive_message", data);
            }
        });
    });

    return io;
}

export function getIOInstance() {
    if (!io) throw new Error("Socket.io has not been initialized.");
    return io;
}
