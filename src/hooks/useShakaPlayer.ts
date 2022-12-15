import { useShakaPlayerContext } from "./useShakaPlayerContext";

export const useShkaPlayer = () => {
  const { shakaPlayer, setShakaPlayer } = useShakaPlayerContext();

  return { shakaPlayer, setShakaPlayer };
};
