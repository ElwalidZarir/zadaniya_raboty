import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { songsdata } from "./audio";

const Form = () => {
  const [url, setUrl] = useState("");

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const [flag, setFlag] = useState(false);

  const handleUrl = (url, arr) => {
    let res = arr.some((element) => element === url);
    if (!res) {
      setFlag(true);
    }
  };

  return (
    <div>
      <form>
        <input
          value={url}
          onChange={handleChange}
          className="link_text"
          type="text"
          placeholder="https://"
        />
        <button onClick={handleUrl(url, songsdata)} className="btn_form">
          Click
        </button>
      </form>
    </div>
  );
};

export default Form;
