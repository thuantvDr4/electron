//
const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron");

//
const pathImg = document.getElementById("output-path");
const form = document.getElementById("image-form");
const slider = document.getElementById("slider");
const img = document.getElementById("img");
const openImgPath = document.getElementById("output-path-btn");
//event

//submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const imgPath = img.files[0].path;
  const quality = parseInt(slider.value);
  // send event to main-electron
  ipcRenderer.send("image:minimize", { imgPath, quality });
});

//get event from main-electron
ipcRenderer.on("image:done", (e, option) => {
  M.toast({
    html: `Image resized to ${slider.value}% quality.`,
  });
  pathImg.innerText = option;
});

//open-imgPath
openImgPath.addEventListener("click", (e) => {
  const imgPath = img.files[0];
  if (!imgPath) return;
  //
  ipcRenderer.send("image:open");
});

//
// pathImg.innerText = path.join(os.homedir(), "imageshrink");
