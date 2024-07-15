import { CURRENT_HOST } from '../Constants';

export const createAxiosInstance = (history) => {
        const axiosInstance = axios.create({
                baseURL: CURRENT_HOST,
                headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                }
        });

        axiosInstance.interceptors.response.use(
                response => {
                    return response;
                },
                error => {
                    if (error.response && error.response.status === 403) {
                        console.log('error ---------');
                        localStorage.removeItem('token');
                        history('/login');
                    } else {
                        return error
                    }
                    // return Promise.reject(error);
                }
        );

        return axiosInstance;
}