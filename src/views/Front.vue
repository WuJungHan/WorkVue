<template>
  <main class="position-relative">
    <!-- 導覽列navbar -->
    <nav
      class="
        navbar navbar-expand-lg navbar-dark
        my-navbar-bg
        position-sticky
        top-0
      "
    >
      <div class="container">
        <router-link class="navbar-brand caveat fs-1" to="/">FIV5</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul
            class="navbar-nav me-auto my-2 my-lg-0"
            style="--bs-scroll-height: 100px"
          >
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/index">
                FIV5品牌首頁
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/products">
                FIV5手造
              </router-link>
            </li>
            <!-- <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/discount">
              FIV5優惠
            </router-link>
          </li> -->
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/shop">
                FIV5門市＆常見問題
              </router-link>
            </li>
          </ul>
          <ul class="d-flex justify-content-between">
            <li class="nav-item position-relative">
              <router-link
                class="nav-link text-white"
                aria-current="page"
                to="/cart"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-cart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1
  .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13
  12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5
  12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7
  1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                  /></svg
                ><span
                  class="
                    position-absolute
                    top-0
                    start-100
                    translate-middle
                    badge
                    rounded-pill
                    bg-secondary
                  "
                  v-if="cartData.carts && cartData.carts.length != 0"
                >
                  <!-- v-if="cartData.carts預防出錯undefind跟cartData.carts.length!=0預防顯示購物車無資料顯示0-->
                  {{ cartData.carts.length }}
                  <span class="visually-hidden">unread messages</span></span
                >
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-white"
                aria-current="page"
                to="/login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0
  8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757
  1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 主顯示區塊前台子頁面用  -->
    <router-view></router-view>
    <!-- footer -->
    <section class="bg-dark">
      <div class="container text-center text-light">
        <div class="row">
          <div class="col pt-3">
            <p><span>icon</span>,FIV5 made in 2021</p>
            <p>僅作為個人作品，無任何商業用途，未經同意請勿轉載</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import emitter from '../assets/javascript/emitter';

export default {
  // 區域註冊元件
  components: {},
  data() {
    return {
      cartData: {},
    };
  },
  methods: {
    getCart() {
      // 客戶購物 [免驗證]-取得購物車列表
      // /api/:api_path/cart get
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      // this.$http 代替axios
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartData = res.data.data;
          } else {
            this.$swal({
              title: res.data.message,
              icon: 'error',
            });
          }
        })
        .catch((err) => {
          this.$swal({
            title: err,
            icon: 'error',
          });
        });
    },
  },
  mounted() {
    this.getCart();
    // 監聽購物車資料改變 並執行函式
    emitter.on('updata-cart', () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
.caveat {
  font-family: 'Caveat', cursive;
}
.my-navbar-bg {
  background: linear-gradient(to right, #ffd89b, #19547b);
  z-index: 999;
}
.front-bg {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, rgba(3, 3, 3, 0.8), rgba(2, 2, 2, 0.8)),
    url(https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80)
      no-repeat center/100% 100%;
}
.front-text-bg {
  height: 100px;
  background: rgba(255, 252, 252, 0.3);
}
.brand-btn {
  background: #ffd89b;
  &:hover {
    background: #c7a979;
  }
}
.product-btn {
  background: #19547b;
  &:hover {
    background: #123d5a;
  }
}
</style>
