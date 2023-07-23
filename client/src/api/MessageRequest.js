import { User } from "../store/userDetails";

const API_URL = import.meta.env.VITE_REACT_API_URL;

export const getMessage = async (id) => {
    try {
        const response = await fetch(`${API_URL}/message/${id}`);
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.log(error);
    }
};
export const sendMessage = async ({ chatId, message }) => {
    try {
        console.log("userId",User.id,chatId)
        const data = {chatId: chatId, senderId: User.id, text: message}
        console.log("data", data)
        const response = await fetch(`${API_URL}/message`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.log(error);
    }
};
