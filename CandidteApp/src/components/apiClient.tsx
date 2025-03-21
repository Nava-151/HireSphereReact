import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5071/", // כתובת הבקשות שלך
});

// Interceptor להוספת ה-Token אוטומטית, חוץ מהתחברות והרשמה
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // מסלולים שלא דורשים הוספת Token
    const authPaths = ["/login", "/register"];

    // אם ה-URL אינו בהתחברות או הרשמה ויש Token - נוסיף אותו
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

export default apiClient;
