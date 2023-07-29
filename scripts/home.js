"use strict";

const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const btnLogout = document.querySelector("#btn-logout");
const message = document.querySelector("#welcome-message");

displayHome();
function displayHome() {
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    const title = `Chào mừng ${currentUser.userName} đã đến với trang ứng dụng của chúng tôi!`;
    message.innerHTML = "";
    message.append(title);
    message.style.fontSize = "3rem";
    message.style.color = "blue";
  } else {
    mainContent.style.display = "none";
    loginModal.style.display = "block";
  }
}

btnLogout.addEventListener("click", function () {
  const isIsLogout = confirm(
    `Bạn ${currentUser.userName}, bạn chắc chắn muốn thoát ?`
  );
  if (isIsLogout) {
    // gán giá trị currentUser = null để biểu thị là không có ai đang đăng nhập
    currentUser = null;
    saveToStorage("currentUser", currentUser);
    //Hiển thị lại trang Home ở dang chưa có User đăng nhập
    displayHome();
  }
});
