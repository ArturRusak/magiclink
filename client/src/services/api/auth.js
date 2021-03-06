import axios from "axios";

export function handleLogin({login, password}) {
  return axios.post(`/login`, {
    userName: login,
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

/**
 * Query for checking isAuthorized user
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function checkAuth() {
  return axios.get('/check-auth')
    .then(response => response)
    .catch(error => error)
}

export async function registration(data) {
  return axios.post(`/registration`, {...data})
    .then(response => response.data)
    .catch(error => error);
}
