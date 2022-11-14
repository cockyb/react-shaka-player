# react-shaka-plyr
[Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html) wrapped react component

# Installation
```shell
yarn add react-shaka-plyr
//or
npm install react-shaka-plyr
```

# Usage
[Free m3u8 streams](https://gist.github.com/Fazzani/8f89546e188f8086a46073dc5d4e2928)
```typescript
import { ShakaPlayer } from "react-shaka-plyr";

function App() {
  return (
    <ShakaPlayer src="http://sample.vodobox.net skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8"/>
  );
}
```