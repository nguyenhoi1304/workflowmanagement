"use strict";
const key = "USER_ARRAY";

const users = getFromStorage(key) ?? [];
const tasks = getFromStorage("TODO_ARRAY") ? getFromStorage("TODO_ARRAY") : [];

//chuyển đổi về dang claas Instance trả về 1 mảng chứa các instance của class User
const userArr = users.map((user) => parseUser(user));
const todoArr = tasks.map((task) => parseTask(task));

//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// //Hàm lưu dữ liệu
function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

//Lấy dữ liệu User đăng nhập , active User đó ở localStorage
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

//Hàm chuyển từ Js Object sang Class Instance của User class
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord,
    userData.pageSize,
    userData.category
  );
  return user;
}

//Hàm chuyển từ Js Object sang Class Instance của Task Class
function parseTask(TaskData) {
  const task = new Task(TaskData.task, TaskData.owner, TaskData.isDone);
  return task;
}
