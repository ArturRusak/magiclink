import axios from "axios";

export function login() {
  return axios.post(`/login`, {
    username: "ARTUR",
    password: "test"
  })
    .then(response => {
      console.log(JSON.stringify(response.headers));
      return response;
    })
    .then(response => response.data)
    .catch(error => error);
}