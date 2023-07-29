"use strict";

const btnRegister = document.querySelector("#btn-submit");
const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUserName = document.querySelector("#input-username");
const inputPassWord = document.querySelector("#input-password");
const inputPasswordConfirm = document.querySelector("#input-password-confirm");

btnRegister.addEventListener("click", function () {
  //lấy dữ liệu từ người dùng nhập vào từ form
  const dataRegister = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassWord.value
  );

  //Check validate
  const isValidate = validate(dataRegister);

  //Nếu đăng ký đủ điều kiện thì:
  if (isValidate) {
    //thêm user vào mảng
    userArr.push(dataRegister);

    //Lưu dữ liệu xuống localStorage
    saveToStorage("USER_ARRAY", userArr);

    alert("Bạn đã đăng ký tài khoản thành công");

    //Điều hướng sang trang login
    window.location.assign("../pages/login.html");
  }
});
console.log(userArr);

function validate(data) {
  let isIsValidate = true;
  if (data.firstName.trim().length === 0) {
    alert("First Name không được để trống");
    isIsValidate = false;
  }

  if (data.lastName.trim().length === 0) {
    alert("Last Name không được để trống");
    isIsValidate = false;
  }
  if (data.userName.trim().length === 0) {
    alert("User Name không được để trống");
    isIsValidate = false;
  }
  // Nếu tồn tại user trùng với user người tạo thì báo lỗi
  if (
    //Kiểm tra xem trong data đã có userName mà người dùng nhập không  nếu có thì  đưa ra thông báo cho người dùng
    !userArr.every((item) => (item.userName !== data.userName ? true : false))
  ) {
    alert("User Name đã có, mời bạn đặt User Name khác");
    isIsValidate = false;
  }
  if (data.passWord === "") {
    alert("PassWord không được để trống");
    isIsValidate = false;
  }
  //Người dùng nhập password phải lớn hơn 8 ký tự
  if (data.passWord.length < 8) {
    alert("PassWord của bạn phải dài hơn 8 ký tự");
    isIsValidate = false;
  }

  if (data.inputPasswordConfirm === "") {
    alert("ConfirmPassWord không được để trống");
    isIsValidate = false;
  }

  // người  dùng phải nhập đúng password với confirm password
  if (data.passWord !== inputPasswordConfirm.value) {
    alert("Password và conFirmPassword của bạn không trùng khớp");
    isIsValidate = false;
  }
  return isIsValidate;
}
