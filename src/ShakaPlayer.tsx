import React from "react";

interface IShakaPlayer {
  src: string;
}

function ShakaPlayer(
  props: IShakaPlayer,
  ref: React.LegacyRef<HTMLVideoElement>
) {
  const { src, ...rest } = props;

  return (
    <video {...rest} ref={ref}>
      shakaplayer
    </video>
  );
}

export default React.forwardRef(ShakaPlayer);
