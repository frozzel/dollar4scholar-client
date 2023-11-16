import axios from "axios";


// const client = axios.create({baseURL: "http://localhost:8080/api"});
const client = axios.create({baseURL: import.meta.env.VITE_APP_API});

export default client;
