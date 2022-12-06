import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";
import { useShakaPlayerContext } from "../hooks/useShakaPlayerContext";
import { wrapEvent } from "../utils";
const muxjs = require("mux.js");

shaka.polyfill.installAll();

export interface IShakaPlayer
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  src: string;
  config?: shaka.extern.PlayerConfiguration;
  uiConfig?: shaka.extern.UIConfiguration;
}

export interface ShakaControlsRef {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}

export const ShakaPlayer = forwardRef((props: IShakaPlayer, ref) => {
  const {
    src,
    children,
    config = {},
    uiConfig = {},
    onTimeUpdate,
    onPlay,
    onPlaying,
    onWaiting,
    onPause,
    onVolumeChange,
    onDurationChange,
    ...rest
  } = props;

  const [shakaPlayer, setShakaPlayer] = useState<shaka.Player>();
  const [shakaUi, setShakaUi] = useState<shaka.ui.Overlay>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const uiContainerRef = useRef<HTMLDivElement>(null);

  const { setState, setTime, setDuration } = useShakaPlayerContext();

  useEffect(() => {
    window.muxjs = muxjs;
  }, []);

  useEffect(() => {
    if (videoRef.current == null) return;

    setShakaPlayer(new shaka.Player(videoRef.current));
  }, []);

  useEffect(() => {
    if (shakaPlayer == null) return;
    if (uiContainerRef.current == null) return;
    if (videoRef.current == null) return;

    setShakaUi(
      new shaka.ui.Overlay(
        shakaPlayer,
        uiContainerRef.current,
        videoRef.current
      )
    );
  }, [shakaPlayer]);

  useEffect(() => {
    if (!src) return;
    if (shakaPlayer == null) return;
    if (shaka.Player.isBrowserSupported() === false) return;

    (async (src) => {
      shakaPlayer.load(src);
    })(src);
  }, [shakaPlayer, src]);

  useEffect(() => {
    if (shakaPlayer == null) return;
    shakaPlayer.configure(config);
  }, [config]);

  useEffect(() => {
    if (shakaUi == null) return;
    shakaUi.configure(uiConfig);
  }, []);

  const handleTimeUpdate: React.ReactEventHandler<HTMLVideoElement> = (e) => {
    setTime(e.currentTarget.currentTime);
  };
  const handlePlay: React.ReactEventHandler<HTMLVideoElement> = (e) =>
    setState((prev) => ({ ...prev, paused: false }));
  const handlePlaying: React.ReactEventHandler<HTMLVideoElement> = (e) =>
    setState((prev) => ({ ...prev, playing: true }));
  const handleWaiting: React.ReactEventHandler<HTMLVideoElement> = (e) =>
    setState((prev) => ({ ...prev, playing: false }));
  const handlePause: React.ReactEventHandler<HTMLVideoElement> = (e) =>
    setState((prev) => ({ ...prev, paused: true, playing: false }));
  const handleVolumeChange: React.ReactEventHandler<HTMLVideoElement> = (e) =>
    setState((prev) => ({
      ...prev,
      muted: e.currentTarget.muted,
      volume: e.currentTarget.volume,
    }));
  const handleDurationChange: React.ReactEventHandler<HTMLVideoElement> = (e) =>
    setDuration(e.currentTarget.duration);
  useImperativeHandle(
    ref,
    () => ({
      play() {
        if (videoRef.current == null) return;
        videoRef.current.play();
      },
      pause() {
        if (videoRef.current == null) return;
        videoRef.current.pause();
      },
      mute() {
        if (videoRef.current == null) return;
        videoRef.current.muted = true;
      },
      unmute() {
        if (videoRef.current == null) return;
        videoRef.current.muted = false;
      },
      seek(time: number) {
        if (videoRef.current == null) return;
        videoRef.current.currentTime = Math.max(0, time);
      },
      volume(volume: number) {
        if (videoRef.current == null) return;
        videoRef.current.volume = Math.min(1, Math.max(0, volume));
      },
    }),
    []
  );

  return (
    <>
      <div ref={uiContainerRef}>
        <video
          ref={videoRef}
          style={{ width: "100%", height: "100%" }}
          onTimeUpdate={wrapEvent(handleTimeUpdate, onTimeUpdate)}
          onPlay={wrapEvent(onPlay, handlePlay)}
          onPlaying={wrapEvent(onPlaying, handlePlaying)}
          onWaiting={wrapEvent(onWaiting, handleWaiting)}
          onPause={wrapEvent(onPause, handlePause)}
          onVolumeChange={wrapEvent(onVolumeChange, handleVolumeChange)}
          onDurationChange={wrapEvent(onDurationChange, handleDurationChange)}
          {...rest}
        />
        {children}
      </div>
    </>
  );
});
