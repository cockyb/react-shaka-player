import React, { useEffect, useRef, useState } from "react";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";
const muxjs = require("mux.js");

shaka.polyfill.installAll();
interface IShakaPlayer
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  src: string;
}

function ShakaPlayer(props: IShakaPlayer) {
  const { src, children, ...rest } = props;

  const [shakaPlayer, setShakaPlayer] = useState<shaka.Player>();
  const [shakaUi, setShakaUi] = useState<shaka.ui.Overlay>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const uiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.muxjs = muxjs;
  }, []);

  useEffect(() => {
    if (videoRef.current == null) return;

    setShakaPlayer(new shaka.Player(videoRef.current));
  }, []);

  useEffect(() => {
    if (
      shakaPlayer &&
      uiContainerRef.current != null &&
      videoRef.current != null
    ) {
      const ui = new shaka.ui.Overlay(
        shakaPlayer,
        uiContainerRef.current,
        videoRef.current
      );
      setShakaUi(ui);
    }
  }, [shakaPlayer]);

  useEffect(() => {
    if (shakaPlayer && src && shaka.Player.isBrowserSupported()) {
      (async (src) => {
        shakaPlayer.load(src);
      })(src);
    }
  }, [shakaPlayer, src]);

  return (
    <div ref={uiContainerRef}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        {...rest}
      />
      {children}
    </div>
  );
}

export default ShakaPlayer;
