"use strict";

//Class User để chưa các thông tin về người dùng
class User {
  constructor(
    firstName,
    lastName,
    userName,
    passWord,
    //Mặc định không chọn giá trị của 2 thuộc tính pageSize và category
    pageSize = 5,
    category = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;

    this.pageSize = pageSize;
    this.category = category;
  }
}

//Class Task để chứa các thông tin về Task trong TodoList
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
