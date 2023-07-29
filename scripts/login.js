"use strict";

const inputUserName = document.querySelector("#input-username");
const inputPassWord = document.querySelector("#input-password");
const btnLogin = document.querySelector("#btn-submit");

btnLogin.addEventListener("click", function () {
  // Kiểm tra xem người dùng đã nhập đủ userName và Password hay chưa
  const isValidate = validate();

  if (isValidate) {
    //Tìm kiếm trong userArr thông tin user người dùng nhập vào có đúng hay không
    const user = userArr.find(
      (item) =>
        item.userName === inputUserName.value &&
        item.passWord === inputPassWord.value
    );
    if (user) {
      alert("Đăng nhập thành công");
      // lưu thông tin user hiện tại đang đăng nhập lên trang
      saveToStorage("currentUser", user);
      //Chuyển hướng về trang chủ
      window.location.assign("../index.html");
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại !");
    }
  }
});

function validate() {
  let isValidate = true;
  if (inputUserName.value === "") {
    alert("User Name của bạn không được để trống");
    isValidate = false;
  }
  if (inputPassWord.value === "") {
    alert("Pass Word của bạn không được để trống");
    isValidate = false;
  }

  return isValidate;
}
