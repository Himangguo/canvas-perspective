import CanvasPerspective from "./canvasPerspective";
import redVideoUrl from "./video/red.mp4";
const canvasEle = document.querySelector("#canvas-perspective");
const videoEle = document.querySelector("#video-red");
const upload_input = document.querySelector("#upload-video");
const color_select = document.querySelector("#color-select");
const demo_checkbox = document.querySelector("#demo-checkbox");

const cp = new CanvasPerspective(canvasEle, videoEle);

upload_input.addEventListener("change", (e) => {
  cp.destroy();
  demo_checkbox.checked = false;
  const url = URL.createObjectURL(e.target.files[0]);
  videoEle.src = url;
});

videoEle.addEventListener("loadeddata", () => {
  canvasEle.width = videoEle.width;
  canvasEle.height =
    videoEle.videoHeight * (videoEle.width / videoEle.videoWidth);
});

color_select.addEventListener("change", (e) => {
  cp.changeColor(e.target.value);
});

demo_checkbox.addEventListener("change", (e) => {
  const checked = e.target.checked;
  if (checked) {
    cp.destroy();
    upload_input.value = '';
    videoEle.src = redVideoUrl;
  } else {
    videoEle.src = "";
    cp.destroy();
  }
});
