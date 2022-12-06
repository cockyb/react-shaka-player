import React, { useState } from "react";
import { ShakaPlayerContext, VideoState } from "../hooks/useShakaPlayerContext";

export const ShakaPlayerProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, setState] = useState<VideoState>({
    paused: false,
    muted: false,
    volume: 1,
    playing: false,
  });
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <ShakaPlayerContext.Provider
      value={{ state, setState, time, setTime, duration, setDuration }}
    >
      {children}
    </ShakaPlayerContext.Provider>
  );
};
