function toggleFullscreen() {
  const docElm = document.documentElement;
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // 进入全屏
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
    // 退出全屏
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

// 全屏按钮文本更新
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

// 事件监听
document.addEventListener("fullscreenchange", updateFullscreenBtn);
document.addEventListener("webkitfullscreenchange", updateFullscreenBtn);
document.addEventListener("mozfullscreenchange", updateFullscreenBtn);
document.addEventListener("MSFullscreenChange", updateFullscreenBtn);
window.onload = updateFullscreenBtn;
window.addEventListener("resize", adjustIframeContainer);

// 根据父容器的宽高比动态调整iframe的宽高，保证iframe内容自适应且不变形。
function adjustIframeContainer() {
  // 获取所有带有 .iframe-container 类的容器
  const containers = document.querySelectorAll(".iframe-container");
  containers.forEach((container) => {
    // 查找容器内的iframe元素
    const iframe = container.querySelector("iframe");
    if (iframe) {
      if (container.id === "drill-data") {
        targetRatio = 16 / 10; // 钻孔数据页面16:10
      } else if (container.id === "iot-box") {
        targetRatio = 16 / 10; // 物联盒子页面16:10
      }
      // 计算容器的宽高比
      const aspectRatio = container.offsetWidth / container.offsetHeight;
      if (aspectRatio > targetRatio) {
        // 宽高比大于目标比例，iframe宽度100%，高度自适应
        iframe.style.width = "100%";
        iframe.style.height = "auto";
      } else {
        // 宽高比小于等于目标比例，iframe高度100%，宽度自适应
        iframe.style.width = "auto";
        iframe.style.height = "100%";
      }
    }
  });
}
