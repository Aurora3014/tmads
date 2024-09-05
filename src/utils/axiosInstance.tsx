import { CURRENT_HOST } from '../Constants';

export const createAxiosInstance = (history) => {
        const axiosInstance = axios.create({
                baseURL: CURRENT_HOST,
                headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                }
        });

        axiosInstance.interceptors.response.use(
                response => {
                    return response;
                },
                error => {
                    if (error.response && error.response.status === 403) {
                        console.log('error ---------');
                        Cookies.remove('token');
                        history(`${Cookies.get('mode')}/login`);
                    } else {
                        return error
                    }
                    // return Promise.reject(error);
                }
        );

        return axiosInstance;
}