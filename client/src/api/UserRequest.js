const API_URL = import.meta.env.VITE_REACT_API_URL;

export const getUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}`);
        if (response.ok) {
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
};
