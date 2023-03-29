import React, { memo } from "react";
import Layout from "./component/layout";
import { CanvasModule } from "./component/canvas";

const PixelCanvas = memo(
  ({ needConfirm, canvasState }: PixelCanvas.CanvasProps) => {
    return (
      <Layout>
        <CanvasModule needConfirm={needConfirm} canvasState={canvasState} />
      </Layout>
    );
  }
);

export default PixelCanvas;
