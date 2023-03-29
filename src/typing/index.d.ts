declare namespace PixelCanvas {
  interface CanvasProps {
    needConfirm?: boolean;
    canvasState?: CanvasStateProps;
  }

  interface DrawingDataProps {
    x: number;
    y: number;
    color: string;
  }

  interface CanvasStateProps {
    row: number;
    col: number;
    space: number;
  }
}
