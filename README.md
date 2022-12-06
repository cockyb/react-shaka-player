# react-shaka-plyr
This project is [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html) wrapped react component

Before starting, please read the [documents]((https://shaka-player-demo.appspot.com/docs/api/index.html)) related to Shaka Player first.

I'm inspired by [react-use - useVideo](https://github.com/streamich/react-use/blob/master/docs/useVideo.md) Hooks and [Headless UI Component](https://headlessui.com/), and try to keep the interface similar to those libraries.

# Installation
```shell
/* recommended */
yarn add react-shaka-plyr
// or
npm install react-shaka-plyr
```

# Usage
[Free m3u8 streams](https://gist.github.com/Fazzani/8f89546e188f8086a46073dc5d4e2928)
```typescript
import React from "react";
import { useRef } from "react";
import {
  ShakaPlayer,
  ShakaPlayerProvider,
  ShakaControlsRef,
  useShakaState
} from "react-shaka-plyr";

const App = () => {
  return (
    <ShakaPlayerProvider>
      <Player />
    </ShakaPlayerProvider>
  );
};

const Player = () => {
  const state = useShakaState();
  const ref = useRef<ShakaControlsRef>(null);

  return (
    <>
      <ShakaPlayer
        ref={ref}
        src="http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8"
      />
      {Object.entries(state).map(([key, value]) => {
        return (
          <div key={key} style={{ display: "flex", gap: 8 }}>
            <span>{key}</span>
            <span>{String(value)}</span>
          </div>
        );
      })}
      <button onClick={() => ref.current?.pause()}>Pause</button>
      <button onClick={() => ref.current?.play()}>Play</button>
      <br />
      <button onClick={() => ref.current?.mute()}>Mute</button>
      <button onClick={() => ref.current?.unmute()}>Un-mute</button>
      <br />
      <button onClick={() => ref.current?.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => ref.current?.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => ref.current?.volume(1)}>Volume: 100%</button>
      <br />
      <button onClick={() => ref.current?.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => ref.current?.seek(state.time + 5)}>+5 sec</button>
    </>
  );
};
```

To customize the controller, use the following options
Reference: [Shaka Player Customizing the UI
](https://shaka-player-demo.appspot.com/docs/api/tutorial-ui-customization.html)


```typescript
    <ShakaPlayer
      ref={ref}
      src="http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8"
      uiConfig={{ controlPanelElements: [], addSeekBar: false }}
      style={{ position: "relative" }}
    >
        <button
          style={{ position: "absolute" }}
          onClick={() => ref.current?.play()}
        >
          Play
        </button>
        ...
    </ShakaPlayer>
```

# Props
By default, ShakaPlayer component props inherit HTMLVideoElement attributes.
ex: src, autoPlay, muted, loop, onLoad, onTimeupdate...
| Props    | Optional | Description                                                                                                    | Type                              |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| config   | true     | shaka player [config](https://shaka-player-demo.appspot.com/docs/api/tutorial-config.html) object              |                                   |
| uiConfig | true     | shaka player [ui config](https://shaka-player-demo.appspot.com/docs/api/tutorial-ui-customization.html) object |                                   |
| ref      | true     | A ref object for player control                                                                                | React.RefObject<ShakaControlsRef> |

# Issue & Contribution
Please feel free to pull request. The issue issue is also the same.