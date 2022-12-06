import { EventHandler, ReactEventHandler, SyntheticEvent } from "react";

type WrapEventFunction = (
  userEvent?: EventHandler<SyntheticEvent<HTMLVideoElement>>,
  proxyEvent?: EventHandler<SyntheticEvent<HTMLVideoElement>>
) => ReactEventHandler<HTMLVideoElement>;

export const wrapEvent: WrapEventFunction = (userEvent, proxyEvent) => {
  return (event) => {
    try {
      proxyEvent && proxyEvent(event);
    } finally {
      userEvent && userEvent(event);
    }
  };
};
