import { settingsAPI } from "../../constants";


export function getLinks() {
  return fetch(`${settingsAPI.API}/links`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}

export function saveLink(value) {
  return fetch(`${settingsAPI.API}/links`, {
    method: "POST",
    headers: settingsAPI.headers,
    //TODO SOLVE PROBLEM RELATED VALUE
    body: JSON.stringify({
      id: "test",
      hash: "hash",
      link: value
    })
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}
