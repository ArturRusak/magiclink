import axios from "axios";

export function handleLogin({login, password}) {
  return axios.post(`/login`, {
    username: login,
    password
  })
    .then(response => response.data)
    .catch(error => error);
}

/**
 *
 * @param {Function} callback - logout function
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function handleLogOut(callback) {
  return axios.get(`/logout`)
    .then(response => {
      callback && callback();
      return response.data;
    })
    .catch(error => error);
}