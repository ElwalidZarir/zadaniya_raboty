import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { songsdata } from "./audio";

const Form = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (songsdata.some((element) => element.url === url)) {
      setError(false);
      console.log("sx");
      setFlag(true);
    } else {
      console.log("cdk");
      setError(true);
    }
  };

  function style(error) {
    if (error) {
      return {
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      };
    }
  }

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const toggleButton = (event) => {
    if (songsdata.some((element) => element.url === url)) {
      setFlag(true);
    }
  };

  return (
    <>
      {flag ? (
        <AudioPlayer />
      ) : (
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <input
                onChange={handleChange}
                className="link_text"
                type="text"
                placeholder="https://"
                style={style(error)} // ADDED
                value={url}
              />
              {error && (
                <p style={{ color: "#f8d231" }} role="alert">
                  Error message here
                </p>
              )}
            </div>

            <button onClick={toggleButton} className="btn_form">
              Click
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
