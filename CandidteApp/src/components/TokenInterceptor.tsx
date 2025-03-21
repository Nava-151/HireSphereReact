import axios from "axios";

const TokenInterceptor = axios.create({
  baseURL: "http://localhost:5071", // כתובת הבקשות שלך
});

// Interceptor להוספת ה-Token אוטומטית, חוץ מהתחברות והרשמה
TokenInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
console.log("token interceptor "+token);

    const authPaths = ["/login", "/register","/blog"];

    if (!authPaths.some(path => config.url?.includes(path)) && token) {
      console.log("in interceptor");
      
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

export default  TokenInterceptor
  ;
