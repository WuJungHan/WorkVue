<template>
  <main class="container mt-3">
    <nav class="border-bottom pb-3 mb-3">
      <div>
        <router-link aria-current="page" to="/index"
          >FIV5品牌首頁</router-link
        >/
        <router-link aria-current="page" to="/shop"
          >FIV5門市</router-link
        >
      </div>
    </nav>
    <section class="row border-bottom animate__animated animate__fadeIn">
      <div class="col-12 col-md-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.8516623063097!2d121.5186622954708!3d25.033625239812505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a99db9a2a94d%3A0x43e9034292df69b2!2z5Lit5q2j57SA5b-15aCC!5e0!3m2!1szh-TW!2stw!4v1626853738270!5m2!1szh-TW!2stw"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
        <ul>
          <li>
            <h3 class="fw-bold">中正區紀念堂品牌概念館</h3>
          </li>
          <li>
            <p>門市地址:台北市中正區中山南路21號旁邊</p>
          </li>
          <li>
            <p>門市電話: (02) 2453 – 0088</p>
          </li>
          <li>
            <p>營業時間: 上午AM08：30～下午PM19：30</p>
          </li>
        </ul>
      </div>
    </section>
    <section class="text-center animate__animated animate__fadeIn">
      <ul>
        <li>
          <h2 class="fw-bold">常見問題</h2>
        </li>
        <li>
          <!-- 如何付款 -->
          <a
            class="fw-bold fs-4 w-100 bg-secondary"
            data-bs-toggle="collapse"
            href="#howToPay"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            如何付款?
          </a>
          <div class="collapse" id="howToPay">
            <div class="card card-body fw-bolder">目前僅接受貨到付款。</div>
          </div>
        </li>
        <li>
          <!-- 如何前往門市 -->
          <a
            class="fw-bold fs-4 w-100 bg-secondary"
            data-bs-toggle="collapse"
            href="#howToGo"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            如何前往門市?
          </a>
          <div class="collapse" id="howToGo">
            <div class="card card-body fw-bolder">
              您可透過自行開車或搭乘大眾運輸工具前往門市。
            </div>
          </div>
        </li>
        <li>
          <!-- 如何處理商品瑕疵? -->
          <a
            class="fw-bold fs-4 w-100 bg-secondary"
            data-bs-toggle="collapse"
            href="#howToChange"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            如何處理商品瑕疵?
          </a>

          <div class="collapse" id="howToChange">
            <div class="card card-body fw-bolder">
              您在收到貨當下，如發現商品有瑕疵疑慮，請勿穿戴避免受傷，並拍照回訊至小幫手，會有專人盡快為您處理。
            </div>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
