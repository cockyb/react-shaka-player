import React from "react";
import { useRef } from "react";
import { ShakaPlayer } from "../index";

export const Player = () => {
  const ref = useRef(null);

  return <ShakaPlayer src="" ref={ref} />;
};
