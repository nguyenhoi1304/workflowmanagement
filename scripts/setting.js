"use strict";

if (currentUser) {
  const inputCategory = document.querySelector("#input-category");
  const inputPageSize = document.querySelector("#input-page-size");
  const submitSave = document.querySelector("#btn-submit");

  submitSave.addEventListener("click", function () {
    const isValidate = validate();
    if (isValidate) {
      //Cập nhật lại CurrentUser
      currentUser.pageSize = inputPageSize.value;
      currentUser.category = inputCategory.value;

      //Lưu vào localStorage
      saveToStorage("currentUser", currentUser);

      //Cập nhật lại mảng userArr
      const index = userArr.findIndex((item) => {
        item.userName === currentUser.userName;
      });
      userArr[index] = currentUser;
      saveToStorage("USER_ARRAY", userArr);

      //Reset lại form nhập vào và thông báo Cập nhật thành công
      inputPageSize.value = "";
      inputCategory.value = "General";
      alert("Cài đặt thành công !");

      //Chuyển đến trang tin tức
      window.location.assign("../pages/news.html");
    }
  });

  function validate() {
    let isValidate = true;

    //Kiểm tra input Pagesize
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("Bạn nhập News per page không hợp lệ ");
      isValidate = false;
    }

    //Kiểm tra input category
    if (inputCategory.value === "") {
      alert("Vui lòng chọn trường News Category");
      isValidate = false;
    }
    return isValidate;
  }
} else {
  alert("Vui lòng đăng nhập để có thế truy cập chức năng ứng dụng này");
  window.location.assign("../index.html");
}
