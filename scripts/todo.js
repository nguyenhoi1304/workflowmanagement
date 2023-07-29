"use strict";

const inputTask = document.querySelector("#input-task");
const btnSubmitAdd = document.querySelector("#btn-add");
const todoList = document.querySelector("#todo-list");

if (currentUser) {
  //Hiển thị all các công việc từ trước
  renderTodoList();

  function renderTodoList() {
    let html = "";
    todoArr
      .filter((item) => item.owner === currentUser.userName)
      .forEach((todo) => {
        html += `
        <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>
        `;
      });
    todoList.innerHTML = html;
    //Bắt các sự kiện
    eventToggleTasks();
    eventDeleteTasks();
  }

  //Bắt sự kiện khi người dùng bấm nút add nhiệm vụ
  btnSubmitAdd.addEventListener("click", function () {
    if (inputTask.value.trim().length == 0) {
      alert("Bạn vui lòng nhập công việc của mình");
    } else {
      const todo = new Task(inputTask.value, currentUser.userName, false);
      // Thêm task mới vào mảng todoArr
      todoArr.push(todo);
      //Lưu vào localStorage
      saveToStorage("TODO_ARRAY", todoArr);
      //Hiển thị lại list todoArr
      renderTodoList(todoArr);
      //reset lại input cho người nhập
      inputTask.value = "";
    }
  });

  // Sự kiện eventToggleTasks

  // Click để set các task vụ đã hoàn thành và chưa hoàn thành
  //Lấy tất cả các phần tử li chưa thông tin của task và lọc qua lấy về từng thẻ Li khi click

  function eventToggleTasks() {
    document.querySelectorAll("#todo-list li").forEach((liEl) => {
      liEl.addEventListener("click", function (e) {
        // console.log("ahihi");
        //Tránh nút delete ra để không bị trùng click với nút delete
        if (e.target !== liEl.children[0]) {
          //toggle class checked
          liEl.classList.toggle("checked");
          //Tìm task vừa click vào (toggle)
          const todo = todoArr.find((todoItem) => {
            return (
              todoItem.owner === currentUser.userName &&
              todoItem.task === liEl.textContent.slice(0, -1)
            ); //Lấy nội dung text chứa task loại bỏ dấu x
          });
          console.log(todo);
          //Sau đó thay đổi thuộc tính isDone của task
          //contains kiểm tra xem trong thẻ li có tồn tại class tên là checked không nếu có trả về True không có trả về false
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          // lưu xuống localStorage
          saveToStorage("TODO_ARRAY", todoArr);
        }
      });
    });
  }

  function eventDeleteTasks() {
    document.querySelectorAll("#todo-list .close").forEach((closeEl) => {
      closeEl.addEventListener("click", function () {
        //Hỏi xác thực bạn muốn xóa
        const isDelete = confirm("Bạn chắc chắn muốn xóa công việc này");
        if (isDelete) {
          //Hàm findIndex Tìm index thứ mấy thỏa mãn điệu kiện
          //Tìm vị trí của task được ấn xóa trong mảng todoArr
          const index = todoArr.findIndex((item) => {
            return (
              item.owner === currentUser.userName && // xác nhận tên user và tên task
              item.task === closeEl.parentElement.textContent.slice(0, -1) // Xác định tên task và so sánh
            );
          });
          console.log(index);
          // Xóa task đó khỏi mảng todoArr
          todoArr.splice(index, 1);
          //Cập nhật lại dữ liệu xuống localStorage
          saveToStorage("TODO_ARRAY", todoArr);
          //Hiển thị lại danh sách Công việc
          renderTodoList();
        }
      });
    });
  }
} else {
  alert("Bạn chưa đăng nhập, Vui lòng đăng nhập để truy cập ứng dụng");
  window.location.assign("../index.html");
}
