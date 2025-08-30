const myImage = document.querySelector("img");
//定义常量myImage，该常量是对象，可被添加，更新和删除；若是值，则不可重新赋值。
//const使用前需声明且需要初始化
myImage.onclick = () => /*图片被点击时执行箭头函数*/ {
  const mySrc = myImage.getAttribute("src");
  //定义常量mySrc，声明后且初始化；getAttribute获取并返回myImage也就是元素img中src的属性
  if (mySrc === "images/test.jpg") {
    myImage.setAttribute("src", "images/test2.jpg");
    //setAttribute("属性"，"新属性值")函数设置属性到新属性值
  } else {
    myImage.setAttribute("src", "images/test.jpg");
    //setAttribute("属性"，"新属性值")函数设置属性到新属性值
  }
};
let myButton = document.querySelector("button");
//定义变量myButton且初始化赋值查询元素button按钮
let myHeading = document.querySelector("h1");
//定义变量myHeading且初始化赋值查询元素h1一级标题
function setUserName() {
  const myName = prompt("请输入用户名.");
  /*声明常量myName，引用prompt函数：弹出提示框提示：请输入用户名.用户输入数据，
  并在用户点击确定后将数据存储在一个变量中，点击取消会将值设置为null，表示引用的值不存在；但是
  若不输入直接点击确认，该值存在但是没有具体值*/
  if (!myName) {
    /*用取反判断用户是否输入了值，规避输入空名字*/ setUserName(); //若输入是空名字重新执行设置用户名
  } else {
    //若输入有效名字
    localStorage.setItem("name", myName);
    /*调用 localStorage API，将数据存储在浏览器中并供后续获取，再用 localStorage 的 setItem() 
  函数创建并存储一个'name' 的数据项，并将它的值设置为 myName 常量*/
    myHeading.textContent = `WELCOME, ${myName}`;
    //将myHeading的textContent属性改为Mozilla is cool，加上常量myName的值
  }
}
if (!localStorage.getItem("name")) {
  /*用取非运算符!检测 name 数据是否存在*/ setUserName(); /*name不存在，判断为ture，
  执行上面的setUserName()函数创建name*/
} else {
  const storedName = localStorage.getItem("name");
  //name存在，判断为false，执行localStorage中的获取项目(getItem)，声明常量storedName，
  // 并初始化赋值对象localStorage.getItem("name")调用浏览器存储的name数据项
  myHeading.textContent = `WELCOME, ${storedName}`;
  //将myHeading的textContent属性由Mozilla is cool改为常量storedName的字符串
}
myButton.onclick = function () /*点击myButton时执行匿名函数或者箭头函数*/ {
  setUserName(); //执行函数setUserName()
};
//以下是调用标段列表的json代码
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxNjQiLCJyblN0ciI6ImtxQW1xbWdMcjA3YnNlc2Npbm1RdVhMM1hPeU5OUzJSIiwiY2xpZW50aWQiOiJlNWNkN2U0ODkxYmY5NWQxZDE5MjA2Y2UyNGE3YjMyZSIsInRlbmFudElkIjoiMDAwMDAwIiwidXNlcklkIjoxNjR9.zhB1Sijls1ietYWJTlFNbb2PwH9XImn7ZlT-NEoPjV8"
);
myHeaders.append("Clientid", "e5cd7e4891bf95d1d19206ce24a7b32e");
myHeaders.append("Account-Type", "0");
myHeaders.append("Systype", "2");
myHeaders.append("Time-Zone", "Asia/Shanghai");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
myHeaders.append("Accept", "*/*");
myHeaders.append("Host", "site.zhdgps.com:9002");
myHeaders.append("Connection", "keep-alive");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "http://site.zhdgps.com:9002/admin/openapi/section/inner/list?projectId&sectionName&pageSize&pageNum&orderByColumn&isAsc",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
