import axios from "axios";

export function getLinks() {
  return axios.get(`/links`, { withCredentials: true })
    .then(response => response.data)
    .catch(error => error);
}

export function getLinkInfo(linkID) {
  return axios.get(`/links/${linkID}`)
    .then(response => response.data)
    .catch(error => error);
}

export function removeLink(linkID) {
  return axios.delete(`/links/${linkID}`)
    .then(response => response.data)
    .catch(error => error);
}

export function saveLink(value) {
  return axios.post(`/links`, {
    link: value
  })
    .then(response => response.data)
    .catch(error => error);
}
