const BASE_URL = "http://localhost:3001";

const apiService = {
    post: async <T>(action: string, data: object={}): Promise<T> => {
        try {
            console.log('api', JSON.stringify({action, ...data}));
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({action, ...data}),
            });

            if (!response.ok) {
                throw new Error(`HTTP ERROR ${response.statusText}`);
            }
            const res = await response.json();

            return res;
        } catch (error) {
            console.error(`API REQUEST ERROR${error}`);
            throw error;
        }
    }
};

export default apiService;