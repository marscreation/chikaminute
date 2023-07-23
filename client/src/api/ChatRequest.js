const API_URL = import.meta.env.VITE_REACT_API_URL;

export const userChats = async (id) => {
    try {
        const response = await fetch(`${API_URL}/chat/${id}`);
        if (response.ok) {
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
};
