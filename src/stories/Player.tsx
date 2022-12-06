import React from "react";
import { useRef } from "react";
import {
  ShakaPlayer,
  ShakaPlayerProvider,
  ShakaControlsRef,
} from "../components";
import { useShakaState } from "../hooks";

export const App = () => {
  return (
    <ShakaPlayerProvider>
      <Player />
    </ShakaPlayerProvider>
  );
};

const Player = () => {
  const state = useShakaState();
  const ref = useRef<ShakaControlsRef>(null);

  return (
    <>
      <ShakaPlayer
        ref={ref}
        src="http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8"
      />
      {Object.entries(state).map(([key, value]) => {
        return (
          <div key={key} style={{ display: "flex", gap: 8 }}>
            <span>{key}</span>
            <span>{String(value)}</span>
          </div>
        );
      })}
      <button onClick={() => ref.current?.pause()}>Pause</button>
      <button onClick={() => ref.current?.play()}>Play</button>
      <br />
      <button onClick={() => ref.current?.mute}>Mute</button>
      <button onClick={() => ref.current?.unmute}>Un-mute</button>
      <br />
      <button onClick={() => ref.current?.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => ref.current?.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => ref.current?.volume(1)}>Volume: 100%</button>
      <br />
      <button onClick={() => ref.current?.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => ref.current?.seek(state.time + 5)}>+5 sec</button>
    </>
  );
};
