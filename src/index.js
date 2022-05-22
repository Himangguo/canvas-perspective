import CanvasPerspective from "./canvasPerspective";

const canvasEle = document.querySelector("#canvas-perspective");
const videoEle = document.querySelector("#video-red");
const upload_input = document.querySelector("#upload-video");

upload_input.addEventListener("change", (e) => {
  const url = URL.createObjectURL(e.target.files[0]);
  videoEle.src = url;
});

videoEle.addEventListener("loadeddata", () => {
  canvasEle.width = videoEle.width;
  canvasEle.height =
    videoEle.videoHeight * (videoEle.width / videoEle.videoWidth);
});
const cp = new CanvasPerspective(canvasEle, videoEle);
