import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

export const apiRequest = async ({ method = "GET", url, data = null, params = null }) => {
    try {
        const config = { method, url };
        if (data !== null) config.data = data;
        if (params !== null) config.params = params;

        const response = await axiosClient(config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};