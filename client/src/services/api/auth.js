import axios from "axios";

export function handleLogin({login, password}) {
  return axios.post(`/login`, {
    username: login,
    password
  })
    .then(response => response.data)
    .catch(error => error);
}