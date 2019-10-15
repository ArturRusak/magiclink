import { settingsAPI } from "../../constants";


export function getLinks() {
  fetch(`${settingsAPI.API}/links`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}
