declare module "shaka-player/dist/shaka-player.ui" {
  export = shaka;
}

declare module "mux.js" {}

interface Window {
  muxjs: any;
}
