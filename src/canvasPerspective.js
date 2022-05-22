import { rgbaConvertToHex } from "./utils/index";
class CanvasPerspective {
  constructor(canvasEle, videoEle, colorScope) {
    this.videoEle = videoEle;
    this.canvasEle = canvasEle;
    this.colorScope = colorScope || "red";
    this.context = this.canvasEle.getContext("2d");
    this.playing = false;
    this.gap = 2;
    this.backgroundImageData = null; // 背景图imageData
    // 监听video的状态
    this.videoEle.addEventListener("play", () => {
      console.log("play");
      this.playing = true;
      this.drawVideo();
    });
    this.videoEle.addEventListener("pause", () => {
      console.log("pause");
      this.playing = false;
    });
  }

  changeColor(color) {
    this.colorScope = color;
  }
  drawVideo() {
    this.context.drawImage(
      this.videoEle,
      0,
      0,
      this.canvasEle.width,
      this.canvasEle.height
    );
    // 获取canvas像素数据
    const imageData = this.context.getImageData(
      0,
      0,
      this.canvasEle.width,
      this.canvasEle.height
    ).data;
    if (!this.backgroundImageData) {
      // 保存第一帧（背景图）的像素数据
      this.backgroundImageData = imageData;
    }
    for (let i = 0; i < this.canvasEle.height; i += this.gap) {
      for (let j = 0; j < this.canvasEle.width; j += this.gap) {
        const pos = (i * this.canvasEle.width + j) * 4;
        /* 
        R - 红色（从0到255）
        G - 绿色（从0到255）
        B - 蓝色（从0到255）
        A - Alpha通道（从0到255; 0是透明的，255是完全可见）
        */
        const red = imageData[pos];
        const green = imageData[pos + 1];
        const blue = imageData[pos + 2];
        let flag = false;
        if (this.colorScope === "red") {
          flag = red > 70 && green < 60 && blue < 60;
        } else if (this.colorScope === "green") {
          flag = green > 70 && red < 60 && blue < 60;
        } else if (this.colorScope === "blue") {
          flag = blue > 70 && red < 60 && green < 60;
        }
        if (flag) {
          const [r, g, b, a] = this.backgroundImageData.slice(pos, pos + 4);
          // 红色区域填充为背景色
          this.context.fillStyle = rgbaConvertToHex(r, g, b, a);
          this.context.fillRect(j, i, this.gap, this.gap);
          // 图像边缘钝化
          this.context.beginPath();
          this.context.arc(j, i, this.gap, 0, 2 * Math.PI);
          this.context.closePath();
          this.context.fill();
        }
      }
    }
    this.playing && window.requestAnimationFrame(this.drawVideo.bind(this));
  }
}

export default CanvasPerspective;
