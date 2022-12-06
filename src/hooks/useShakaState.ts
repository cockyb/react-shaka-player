import { useShakaPlayerContext } from "./useShakaPlayerContext";

export const useShakaState = () => {
  const { state } = useShakaPlayerContext();

  return {
    ...state,
  };
};
