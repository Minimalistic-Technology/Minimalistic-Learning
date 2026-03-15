import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001"
console.log(`Base Url for axios requests is ${baseURL}`);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 - token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem("access_token", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch {
        localStorage.removeItem("access_tokem");
        localStorage.removeItem("refresh_token");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    // Handle other errors
    const status = error.response?.status;
    if (status === 403) console.error("Forbidden: Insufficient permissions");
    if (status === 404) console.error("Resource not found");
    if (status === 500) console.error("Internal server error");

    return Promise.reject(error);
  },
);

export default api;