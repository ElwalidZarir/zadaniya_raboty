import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import { songsdata } from "./audio";
import { AiOutlineArrowRight } from "react-icons/ai";

const Form = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [showPlayer, setShowplayer] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let found = songsdata.some((element) => element.url === url);
    setError(!found);
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

  const toggleButton = () => {
    if (songsdata.some((audio) => audio.url === url)) {
      setShowplayer(true);
    }
  };

  return (
    <>
      {showPlayer ? (
        <AudioPlayer url={url} />
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
              <AiOutlineArrowRight size={30} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
