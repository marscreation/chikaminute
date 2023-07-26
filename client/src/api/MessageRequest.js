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
export const sendMessage = async ({ chatId, message, senderId }) => {
    try {
        const data = { chatId, senderId, text: message };
        const response = await fetch(`${API_URL}/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.log(error);
    }
};
