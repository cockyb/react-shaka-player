import { useShakaPlayerContext } from "./useShakaPlayerContext";

export const useShkaUi = () => {
  const { shakaUi, setShakaUi } = useShakaPlayerContext();

  return { shakaUi, setShakaUi };
};
