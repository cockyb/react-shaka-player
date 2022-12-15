import React, { useState } from "react";
import { ShakaPlayerContext, VideoState } from "../hooks/useShakaPlayerContext";

export const ShakaPlayerProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, setState] = useState<VideoState>({
    time: 0,
    duration: 0,
    paused: false,
    muted: false,
    volume: 1,
    playing: false,
  });
  const [shakaPlayer, setShakaPlayer] = useState<shaka.Player>();
  const [shakaUi, setShakaUi] = useState<shaka.ui.Overlay>();

  return (
    <ShakaPlayerContext.Provider
      value={{
        state,
        setState,
        shakaPlayer,
        setShakaPlayer,
        shakaUi,
        setShakaUi,
      }}
    >
      {children}
    </ShakaPlayerContext.Provider>
  );
};
