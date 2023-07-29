"use strict";

if (currentUser) {
  const btnPrev = document.querySelector("#btn-prev");
  const btnNext = document.querySelector("#btn-next");
  const pageNum = document.querySelector("#page-num");
  const inputQuery = document.querySelector("#input-query");
  const newsContainer = document.querySelector("#news-container");
  const navPageNum = document.querySelector("#nav-page-num");
  const btnSubmit = document.querySelector("#btn-submit");

  let totalResult = 0;
  let keywords = "";
  navPageNum.style.display = "none";

  btnSubmit.addEventListener("click", function () {
    if (inputQuery.value.trim().length === 0) {
      alert("Please enter a keyword");
    } else {
      keywords = inputQuery.value;
      //Gọi hàm hiển thị list News với từ khóa tương ứng lên trang
      getDataNewsByKeyWords(keywords, 1);
    }
  });
  //Lấy dữ liệu từ APi hiển thị list newss ra màn hình
  async function getDataNewsByKeyWords(keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apikey=94a13868999c439d942b62f858c47530`
      );

      const data = await res.json();
      console.log(data);
      //Check lỗi quá 100 lần request/1 ngày
      if (data.status === "error" && data.code === "rateLimited") {
        //Ẩn các nút prev và next
        navPageNum.style.display = "none";
        throw new Error(data.message);
      }

      // Nếu không có bài viết nào được tìm thấy thì hiển thị thông báo
      if (data.totalResults === 0) {
        //Ẩn các nút prev và next
        navPageNum.style.display = "none";
        throw new Error(
          alert(
            "Không có bài viết nào được tìm thấy bởi từ khóa của bạn, Vui lòng nhập từ khóa mới!"
          )
        );
      } else {
        //Hiển thị các ntuts chuyển trang nếu có dữ liệu trả về
        navPageNum.style.display = "block";
        displayNewsList(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //Bắt sự kiện click vào nut Prev
  btnPrev.addEventListener("click", function () {
    //Gọi hàm này để lấy dữ liệu và hiển thị danh sách trước đó
    getDataNewsByKeyWords("keywords", --pageNum.textContent);
  });

  //Bắt sự kiện click vào nut Next
  btnNext.addEventListener("click", function () {
    //Gọi hàm này để lấy dữ liệu và hiển thị danh sách trước đó
    getDataNewsByKeyWords("keywords", ++pageNum.textContent);
  });

  function displayNewsList(data) {
    totalResult = data.totalResults;
    checkBtnPrev();
    checkBtnNext();
    let html = "";
    data.articles.forEach(function (item) {
      html += `
    <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${item.urlToImage}"
									class="card-img"
									alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${item.title}</h5>
									<p class="card-text">${item.description}</p>
									<a href="${item.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>`;
    });
    newsContainer.innerHTML = html;

    //hàm kiểm tra điệu kiện ẩn nút Prev
    function checkBtnPrev() {
      //Nếu page number = 1 thì  ẩn
      if (pageNum.textContent == 1) {
        btnPrev.style.display = "none";
      } else {
        btnPrev.style.display = "block";
      }
    }

    //hàm kiểm tra điều kiện ẩn nút Next
    function checkBtnNext() {
      // Cách chia số lượng hiển thị trên mỗi trang
      // ** page Number = (tổng số trang / số tin hiển thị trên 1 trang)
      if (
        pageNum.textContent == Math.ceil(totalResult / currentUser.pageSize)
      ) {
        btnNext.style.display = "none";
      } else {
        btnNext.style.display = "block";
      }
    }
  }
} else {
  alert("Vui lòng đăng nhập để có thế truy cập chức năng ứng dụng này");
  window.location.assign("../index.html");
}
