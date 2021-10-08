<template>
  <!-- 主視覺圖 -->
  <div class="front-bg h100vh p-3 text-white">
    <div class="container">
      <div class="row h100vh align-items-center">
        <div class="col-0 col-md-7"></div>
        <!-- 文字區塊 -->
        <div
          class="
            col-12 col-md-5
            front-text-bg
            rounded-3
            p-3
            animate__animated animate__fadeIn
          "
        >
          <h2>將自己喜歡的手作品與你分享</h2>
          <p class="fs-5 mt-3">
            每件作品都是手作，每件都無法一模一樣<br />
            這才有手作的溫度。
          </p>
          <div class="d-flex justify-content-center mt-5">
            <!-- 連結區塊 -->
            <router-link class="btn btn-secondary me-3" to="/index"
              >FIV5品牌</router-link
            >
            <router-link class="btn btn-success" to="/products"
              >FIV5產品</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.h100vh {
  height: 100vh;
}
.front-bg {
  // width: 100%;
  // height: 100vh;
  background: linear-gradient(to right, rgba(3, 3, 3, 0.8), rgba(2, 2, 2, 0.8)),
    url(https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80)
      no-repeat center/cover;
}
.front-text-bg {
  height: 300px;
  background: rgba(255, 252, 252, 0.3);
}
</style>
