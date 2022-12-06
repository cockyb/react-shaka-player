import { useShakaPlayerContext } from "./useShakaPlayerContext";

export const useShakaState = () => {
  const { state, time, duration } = useShakaPlayerContext();

  return {
    ...state,
    time,
    duration,
  };
};
