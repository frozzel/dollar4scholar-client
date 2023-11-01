import axios from "axios";
import.meta.env.VITE_APP_API

const client = axios.create({baseURL: "http://localhost:8080/api"});

export default client;
