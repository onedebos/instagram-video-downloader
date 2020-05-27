import React, { useState } from "react";
import services from "./services";
import { DisplayVideo } from "./DisplayVideo";
import "./App.scss";

function App() {
  const [url, setUrl] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setVideoLink("");
    const response = await services.getVideoDownloadUrl(url);
    if (response.error) {
      console.log("error");
      setError("Oops. We couldn't get that video. Sorry!");
      setIsLoading(false);
    } else {
      setVideoLink(response.downloadLink);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="headers">
        <h1>Download any video from Instagram</h1>
        <p>Copy the instagram video URL and paste it below</p>
      </div>
      {error ? (
        <div className="errorWrapper">
          <div className="errorDiv">{error}</div>
        </div>
      ) : (
        ""
      )}

      <form className="videoToDownload" onSubmit={e => handleSubmit(e)}>
        <input
          onChange={e => setUrl(e.target.value)}
          type="text"
          name="url"
          value={url}
          className="inputBar"
          placeholder="enter an ig video url here.."
        ></input>
        <div>
          <button type="submit" className="getVideoBtn">
            Get video
          </button>
        </div>
      </form>
      {isLoading ? (
        <svg class="spinner" viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
      ) : (
        ""
      )}

      {videoLink ? (
        <div className="saveInstructionWrapper">
          <div className="saveInstruction">
            {" "}
            Right click on the video and click <strong>'save as'</strong> to
            save.{" "}
          </div>
        </div>
      ) : (
        ""
      )}
      {videoLink ? <DisplayVideo videoLink={videoLink} /> : ""}
    </div>
  );
}

export default App;
