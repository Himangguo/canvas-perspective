import redVideo from "./video/red.mp4";
import { rgbaConvertToHex } from "./utils/index";
class CanvasPerspective {
  constructor(canvasEle, videoEle) {
    this.videoEle = videoEle;
    this.canvasEle = canvasEle;
    this.context = this.canvasEle.getContext("2d");
    this.videoEle.src = redVideo;
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

  drawVideo() {
    this.context.drawImage(
      this.videoEle,
      0,
      0,
      this.videoEle.width,
      this.videoEle.height
    );
    // 获取canvas像素数据
    const imageData = this.context.getImageData(
      0,
      0,
      this.videoEle.width,
      this.videoEle.height
    ).data;
    if (!this.backgroundImageData) {
      // 保存第一帧（背景图）的像素数据
      this.backgroundImageData = imageData;
    }
    for (let i = 0; i < this.videoEle.height; i += this.gap) {
      for (let j = 0; j < this.videoEle.width; j += this.gap) {
        const pos = (i * this.videoEle.width + j) * 4;
        /* 
        R - 红色（从0到255）
        G - 绿色（从0到255）
        B - 蓝色（从0到255）
        A - Alpha通道（从0到255; 0是透明的，255是完全可见）
        */
        const red = imageData[pos];
        const green = imageData[pos + 1];
        const blue = imageData[pos + 2];
        if (red > 70 && green < 60 && blue < 60) {
          const [r, g, b, a] = this.backgroundImageData.slice(pos, pos + 4);
          this.context.fillStyle = rgbaConvertToHex(r, g, b, a);
          this.context.fillRect(j, i, this.gap, this.gap);
        }
      }
    }
    this.playing && window.requestAnimationFrame(this.drawVideo.bind(this));
  }
}

const cp = new CanvasPerspective(
  document.querySelector("#canvas-perspective"),
  document.querySelector("#viewo-red")
);
