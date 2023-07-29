"use strict";

if (currentUser) {
  const btnPrev = document.querySelector("#btn-prev");
  const btnNext = document.querySelector("#btn-next");
  const pageNum = document.querySelector("#page-num");
  const newsContainer = document.querySelector("#news-container");

  let totalResult = 0;

  dataNews("us", 1);
  //Lấy dữ liệu từ APi hiển thị list newss ra màn hình
  async function dataNews(country, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apikey=94a13868999c439d942b62f858c47530`
      );

      const data = await res.json();
      renderDataNewList(data);
    } catch (err) {
      console.log(err);
    }
  }

  //Bắt sự kiện click vào nut Prev
  btnPrev.addEventListener("click", function () {
    //Gọi hàm này để lấy dữ liệu và hiển thị danh sách trước đó
    dataNews("us", --pageNum.textContent);
  });

  //Bắt sự kiện click vào nut Next
  btnNext.addEventListener("click", function () {
    //Gọi hàm này để lấy dữ liệu và hiển thị danh sách trước đó
    dataNews("us", ++pageNum.textContent);
  });

  function renderDataNewList(data) {
    //Tổng số bài news
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
        pageNum.textContent == Math.ceil(totalResult / currentUser.pageSize) // nếu như kq trả về 13.4444 thì sẽ pageNum = 14 (làm tròn lên)
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
