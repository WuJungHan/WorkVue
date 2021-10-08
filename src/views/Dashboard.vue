<!-- 後台 -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <div class="container">
      <router-link class="navbar-brand" to="/"
        ><span class="caveat fs-3">FIV5</span></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav">
          <li>
            <router-link class="nav-link" aria-current="page" to="/orders"
              >後台訂單</router-link
            >
          </li>
          <li>
            <router-link
              class="nav-link"
              aria-current="page"
              to="/product-management"
              >後台產品管理</router-link
            >
          </li>
          <!-- <li>
            <router-link
              class="nav-link"
              aria-current="page"
              to="/coupon-set"
              >折價卷設定</router-link
            >
          </li> -->
          <li>
            <button type="button" class="btn nav-link" @click="logout">
              登出
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- 主顯示區塊後台子頁面用 配合checkLogin()決定是否顯示子router區塊-->
  <router-view v-if="checkSuccess"></router-view>
  <!-- footer -->
  <section></section>
</template>

<script>
export default {
  data() {
    return {
      checkSuccess: '',
    };
  },
  methods: {
    // 確認登入-token
    checkLogin() {
      // 取出token 驗證
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      // 如果有token
      if (token) {
        // axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`;
        // 登入及驗證-檢查用戶是否仍持續登入
        const url = `${process.env.VUE_APP_API}api/user/check`;
        this.$http.post(url).then((res) => {
          if (res.data.success) {
            this.checkSuccess = true;
          } else {
            this.$swal({
              title: res.data.message,
              icon: 'error',
            });
            this.$router.push('/login');
          }
        });
      } else {
        this.$swal({
          title: '未有登入資訊',
          icon: 'error',
        });
        this.$router.push('/login');
      }
    },
    // 登出並清除token轉回登入頁
    logout() {
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            // 清除 token 的語法 這是將 cookie 中的 token 及到期日清空的語法。
            // document.cookie = '（你的token名）=; expires=; path=/';
            document.cookie = 'hexToken=;expires=; path=/;';
            this.$swal({
              title: res.data.message,
            });
            this.$router.push('/login');
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
  created() {
    this.checkLogin();
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
.caveat {
  font-family: 'Caveat', cursive;
}
</style>
