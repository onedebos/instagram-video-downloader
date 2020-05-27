import React, { useState, useEffect } from "react";
import "./DisplayVideo.css";

export const DisplayVideo = videoLink => {
  const [videoToShow, setVideoToShow] = useState("");

  useEffect(() => {
    setVideoToShow(videoLink);
    return () => {};
  }, [videoLink, videoToShow]);
  return (
    <div>
      <video
        controls
        src={videoToShow.videoLink}
        type="video/mp4"
        className="videoBox"
      ></video>
    </div>
  );
};
