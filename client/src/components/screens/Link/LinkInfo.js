import React, { useEffect, useState } from "react";
import { settingsAPI } from "../../../constants";

export default function LinkInfo({ match }) {
  const linkID = match.params.linkId;
  const [status, setStatus] = useState("");
  const [link, setLink] = useState({});

  useEffect(() => {
    fetch(`${settingsAPI.API}/links/${linkID}`)
      .then(response => response.json())
      .then(({ data, status }) => {
        setStatus(status);
        setLink(data);
      })
      .catch(error => {
        setStatus(`${error}`);
        setLink({});
      });
  }, []);

  return (
    <div>
      <h1>Links Info</h1>
      <h3>ID: {linkID}</h3>
      {
        link.link
      }
    </div>
  );
}


