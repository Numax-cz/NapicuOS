export declare interface windowData {
  /**
   * Window position in X (value in percentage)
   */
  posX: number;
  /**
   * Window position in X (value in percentage)
   */
  posY: number;
  /**
   * Window width
   */
  width: number;
  /**
   * Window height
   */
  height: number;
}

export declare interface windowAppData {
  msg?: string;
}

/**
 * * `Normal` - The application window is free
 * * `Maximized` - The application window is maximized
 * * `Left` - The application window is pinned on the left side of the screen
 * * `Right` - The application window is pinned on the right side of the screen
 */
export declare type windowState = 'maximized' | 'left' | 'right' | 'normal' | 'top-left' | 'top-right';
