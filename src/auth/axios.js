import router from "@/router";
import store from "@/store";
import axios from "axios"

const baseURL = process.env.VUE_APP_BASE_URL
console.log(baseURL);
const Axios = axios.create({
    baseURL,
    headers: { 
      "Content-Type": "application/json",
    },
    withCredentials: true,
});

Axios.interceptors.response.use(
  res => res,
  error => {
    if (error.response.status === 401) {
      store.dispatch('setAuth', false);
      router.push('/login');
    }
    return Promise.reject(error);
  });

  export default Axios;




