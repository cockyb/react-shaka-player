declare module "shaka-player/dist/shaka-player.ui" {
  export class Player {
    static isBrowserSupported(): boolean;

    constructor(video: HTMLVideoElement | null);

    configure(config: any): void;

    load(url: string): void;

    detach(): void;

    destroy(): void;
  }

  export namespace polyfill {
    export function installAll(): void;
  }

  export namespace ui {
    export class Overlay {
      constructor(
        player: Player,
        container: HTMLElement | null,
        video: HTMLVideoElement | null
      );

      configure(config: any): void;
    }
  }
}

declare module "mux.js" {}

interface Window {
  muxjs: any;
}
