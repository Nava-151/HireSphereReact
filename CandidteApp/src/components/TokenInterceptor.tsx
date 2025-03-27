import axios from "axios";

const TokenInterceptor = axios.create({
  baseURL: "https://hiresphereapi.onrender.com", // כתובת הבקשות שלך
  
});

// Interceptor להוספת ה-Token אוטומטית, חוץ מהתחברות והרשמה
TokenInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const authPaths = ["/login", "/register", "/blog"];
    if (!authPaths.some(path => config.url?.includes(path)) && token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers = { Authorization: `Bearer ${token}` };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default TokenInterceptor;
