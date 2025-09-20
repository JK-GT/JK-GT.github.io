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

// 监听全屏状态变化，动态修改按钮文本
document.addEventListener("fullscreenchange", updateFullscreenBtn);
document.addEventListener("webkitfullscreenchange", updateFullscreenBtn);
document.addEventListener("mozfullscreenchange", updateFullscreenBtn);
document.addEventListener("MSFullscreenChange", updateFullscreenBtn);

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

// 页面加载时初始化按钮文本
window.onload = updateFullscreenBtn;

// 设置登录面板的外边距，使其在页面中垂直居中显示
document.getElementById("login-panel").style.margin = "20px 0";

// 用户名输入框回车时，跳到密码输入框
document.getElementById("username").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    // 如果密码为空，则聚焦密码输入框
    if (!document.getElementById("password").value) {
      document.getElementById("password").focus();
    } else {
      login();
    }
  }
});

// 密码输入框回车时，直接登录
document.getElementById("password").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    login();
  }
});

function login() {
  // 获取输入的用户名和密码
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("login-msg");

  // 简单校验
  if (!username || !password) {
    msg.textContent = "请输入用户名和密码";
    return;
  }

  // 创建请求头对象
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");

  // 构造请求体
  var raw = JSON.stringify({
    clientId: "e5cd7e4891bf95d1d19206ce24a7b32e",
    grantType: "password",
    username: username,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // 发送POST请求到API获取Token
  fetch("/api/admin/openapi/auth/getToken", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.code === 200) {
        // 登录成功，显示钻孔数据和物联盒子页面
        document.getElementById("drill-data").style.display = "block";
        document.getElementById("iot-box").style.display = "block";
        msg.style.color = "#2ecc40";
        msg.textContent = "登录成功！";
        // 隐藏登录面板
        setTimeout(() => {
          document.getElementById("login-panel").style.display = "none";
        }, 800);
      } else {
        msg.style.color = "#e74c3c";
        msg.textContent = result.msg || "用户名或密码错误";
      }
    })
    .catch((error) => {
      msg.style.color = "#e74c3c";
      msg.textContent = "登录失败，请重试";
      console.log("error", error);
    });
}
