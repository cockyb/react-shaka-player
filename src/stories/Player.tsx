import React from "react";
import { ShakaPlayer } from "../../dist/bundle";

export const Player = () => {
  return (
    <ShakaPlayer src="http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8" />
  );
};
