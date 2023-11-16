import axios from "axios";
import.meta.env.VITE_APP_API

// const client = axios.create({baseURL: "http://localhost:8080/api"});
const client = axios.create({baseURL: "https://dollar4scholar-server-q23p4.ondigitalocean.app/"});

export default client;
