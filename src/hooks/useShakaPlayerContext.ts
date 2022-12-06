import React, { useContext } from "react";

export interface VideoState {
  time: number;
  duration: number;
  paused: boolean;
  muted: boolean;
  volume: number;
  playing: boolean;
}

interface ShakaPlayerContextProps {
  state: VideoState;
  setState: React.Dispatch<React.SetStateAction<VideoState>>;
}

export const ShakaPlayerContext =
  React.createContext<ShakaPlayerContextProps | undefined>(undefined);

export const useShakaPlayerContext = () => {
  const shakaPlayerContext = useContext(ShakaPlayerContext);
  if (shakaPlayerContext == null)
    throw new Error(
      "No ShakaPlayerContext.Provider found when calling shakaPlayerContext."
    );

  return shakaPlayerContext;
};
