function toggleFullscreen() {
  const docElm = document.documentElement;
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullscreen) {
      docElm.webkitRequestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function updateFullscreenBtn() {
  const btn = document.getElementById("fullscreen-btn");
  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    btn.textContent = "退出全屏";
  } else {
    btn.textContent = "全屏显示";
  }
}

document.addEventListener("fullscreenchange", updateFullscreenBtn);
document.addEventListener("webkitfullscreenchange", updateFullscreenBtn);
document.addEventListener("mozfullscreenchange", updateFullscreenBtn);
document.addEventListener("MSFullscreenChange", updateFullscreenBtn);
window.onload = updateFullscreenBtn;
window.addEventListener("resize", adjustIframeContainer);

function adjustIframeContainer() {
  const containers = document.querySelectorAll(".iframe-container");
  containers.forEach((container) => {
    const iframe = container.querySelector("iframe");
    if (iframe) {
      if (container.id === "drill-data") {
        targetRatio = 16 / 10;
      } else if (container.id === "iot-box") {
        targetRatio = 16 / 10;
      }
      const aspectRatio = container.offsetWidth / container.offsetHeight;
      if (aspectRatio > targetRatio) {
        iframe.style.width = "100%";
        iframe.style.height = "auto";
      } else {
        iframe.style.width = "auto";
        iframe.style.height = "100%";
      }
    }
  });
}
