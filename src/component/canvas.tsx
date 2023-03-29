import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { canUseDOM, getIn } from "../helpers/util";

const StyledCanvasBox = styled.div`
  .confirmButton {
    width: 50px;
    height: 20px;
    border-radius: 4px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CanvasModule = React.memo(
  ({ needConfirm = false, canvasState }: PixelCanvas.CanvasProps) => {
    const row = getIn(["row"], canvasState, 50);
    const col = getIn(["col"], canvasState, 50);
    const space = getIn(["space"], canvasState, 10);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasCtx, setCanvasCtx] = useState(null) as any;
    // 选中状态
    const [selectStatus, setSelectStatus] = useState<boolean>(false);
    // 像素格子颜色
    const [pixelColor] = useState<string>("#ba003f");
    // 当前选中的像素格子数据
    const [currentDrawingData, setCurrentDrawingData] =
      useState<PixelCanvas.DrawingDataProps>({
        x: 0,
        y: 0,
        color: "",
      });

    // 定义函数 绘制canvas线
    const drawLine = (x0, y0, x1, y1, color = "#c8c8c8") => {
      canvasCtx.beginPath();
      canvasCtx.moveTo(x0, y0);
      canvasCtx.lineTo(x1, y1);
      canvasCtx.strokeStyle = color;
      canvasCtx.stroke();
      canvasCtx.closePath();
    };

    // canvas 点击事件
    const handleCanvas = (e) => {
      console.log(selectStatus);
      if (selectStatus) {
        return;
      }
      let rect = null as any;

      if (canUseDOM() && canvasRef && canvasRef.current) {
        rect = canvasRef.current.getBoundingClientRect();
      }

      const rectLeft = getIn(["left"], rect, 0);
      const rectTop = getIn(["top"], rect, 0);
      const rectWidth = getIn(["width"], rect, 0);
      const rectHeight = getIn(["height"], rect, 0);

      let x = 0;
      let y = 0;

      if (!!canvasRef.current) {
        // console.log(
        //   e.clientX,
        //   rectLeft,
        //   canvasRef.current.width,
        //   rectWidth,
        //   "======="
        // );
        x =
          (e.clientX - rectLeft * (canvasRef.current.width / rectWidth)) /
          space;
        y =
          (e.clientY - rectTop * (canvasRef.current.height / rectHeight)) /
          space;
      }
      // console.log(!!canvasRef.current);
      // console.log(x, y);
      // console.log(rectLeft, rectTop, rectWidth, rectHeight);
      setCurrentDrawingData({
        x: Math.ceil(x - 1) * space,
        y: Math.ceil(y - 1) * space,
        color: pixelColor,
      });
      if (!needConfirm) {
        canvasCtx.fillStyle = "red"; // 设置填充颜色
        canvasCtx.strokeStyle = "#c8c8c8";
        canvasCtx.lineWidth = 1;
        canvasCtx.fillRect(
          Math.ceil(x - 1) * space,
          Math.ceil(y - 1) * space,
          space,
          space
        );
        canvasCtx.strokeRect(
          Math.ceil(x - 1) * space,
          Math.ceil(y - 1) * space,
          space,
          space
        );
        // setSelectStatus(false);
      } else {
        canvasCtx.fillStyle = "white"; // 设置填充颜色
        canvasCtx.strokeStyle = "red";
        canvasCtx.lineWidth = 1;
        canvasCtx.fillRect(
          Math.ceil(x - 1) * space,
          Math.ceil(y - 1) * space,
          space,
          space
        );
        canvasCtx.strokeRect(
          Math.ceil(x - 1) * space,
          Math.ceil(y - 1) * space,
          space,
          space
        );
        setSelectStatus(true);
        console.log("执行");
      }
      // setSelectStatus(true);
    };

    // 点击确认位置按钮
    const handleClickBtn = () => {
      canvasCtx.fillStyle = "red"; // 设置填充颜色
      canvasCtx.strokeStyle = "#c8c8c8";
      canvasCtx.lineWidth = 1;
      canvasCtx.fillRect(
        currentDrawingData.x,
        currentDrawingData.y,
        space,
        space
      );
      canvasCtx.strokeRect(
        currentDrawingData.x,
        currentDrawingData.y,
        space,
        space
      );

      setSelectStatus(false);

      // console.log(currentDrawingData, currentDrawingData.x, currentDrawingData.y);
    };

    useEffect(() => {
      if (canUseDOM() && canvasRef.current) {
        setCanvasCtx(canvasRef.current.getContext("2d"));
        // 设置canvas画布宽高
        canvasRef.current.width = col * space;
        canvasRef.current.height = row * space;
      }
    }, []);

    useEffect(() => {
      if (!!canvasCtx) {
        // 设置画板背景色
        canvasCtx.fillStyle = "white";
        canvasCtx.fillRect(0, 0, col * space, row * space);

        // 绘制画板像素格子
        for (let i = 0; i <= row; i++) {
          // 绘制行
          drawLine(0, i * space, col * space, i * space);
        }
        for (let i = 0; i <= col; i++) {
          // 绘制列
          drawLine(i * space, 0, i * space, row * space);
        }

        // drawingData.map(({ x, y, color }) => drawBlock(x, y, color));

        // 设置canvas点击监听事件
        if (canvasRef.current) {
          canvasRef.current.addEventListener("click", (e) => handleCanvas(e));
        }
      }
    }, [canvasCtx]);

    return (
      <StyledCanvasBox>
        <canvas ref={canvasRef}>当前浏览器不支持canvas标签</canvas>
        {needConfirm && (
          <button className="confirmButton" onClick={handleClickBtn}>
            确认
          </button>
        )}
      </StyledCanvasBox>
    );
  }
);

export { CanvasModule };
