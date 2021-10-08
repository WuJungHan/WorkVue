<template>
  <main class="container vh-100">
    <div class="row h100vh align-items-center justify-content-center">
      <div class="col-10 col-md-6 col-lg-4">
        <h1 class="text-center fs-1 mb-5">
          請登入後台系統
          <router-link to="/">FIV5</router-link>
        </h1>
        <!-- 將type submit按鈕 預設為呼叫 axiosLogin函式-->
        <Form class="fs-5 text" v-slot="{ errors }" @submit="goToAdmin">
          <div class="mb-3">
            <label for="email">帳號</label>
            <Field
              type="email"
              class="form-control"
              id="loginEmail"
              aria-describedby="emailHelp"
              name="email"
              placeholder="name@example.com"
              :class="{ 'is-invalid': errors['email'] }"
              rules="email|required"
              v-model="user.username"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            <div id="emailHelp" class="form-text text-warning fs-5"></div>
          </div>
          <div class="mb-5">
            <label for="password">密碼</label>
            <Field
              type="password"
              class="form-control"
              id="loginPassword"
              name="password"
              placeholder="password"
              :class="{ 'is-invalid': errors['password'] }"
              rules="required|min:8"
              v-model="user.password"
            ></Field>
            <ErrorMessage
              name="password"
              class="invalid-feedback"
            ></ErrorMessage>
            <div id="passwordHelp" class="form-text text-warning fs-5"></div>
            <a
              href="https://www.google.com/search?q=forgot+password%3F&rlz=1C1CHBF_zh-TWTW896TW896&sxsrf=ALeKk03LxkcYD3kxGB1GGTas2FmDAwYq2g%3A1621885696248&ei=AAOsYOrMDs-Ir7wPwpqTqAo&oq=forgot+password%3F&gs_lcp=Cgdnd3Mtd2l6EAMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAUPilelj4pXpg16h6aABwAHgAgAFPiAGEAZIBATKYAQCgAQKgAQGqAQdnd3Mtd2l6wAEB&sclient=gws-wiz&ved=0ahUKEwjqzKmGi-PwAhVPxIsBHULNBKUQ4dUDCA4&uact=5"
              class="link-info"
              >forgot password?</a
            >
          </div>
          <p
            id="loginStatusText"
            class="text-warning text-center mb-2 fs-5 loginStatusTextBg"
          ></p>
          <input
            type="submit"
            class="btn btn-lg w-100 btn-primary text-white"
            id="loginBtn"
            value="Login"
          />
        </Form>
      </div>
    </div>
  </main>
</template>

<!-- js區塊 -->
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    goToAdmin() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          if (res.data.success) {
            // true
            // 登入成功後 expired=到期日 token=憑證 (到期日過憑證就無使用) uid=實際儲存在後端使用的身分
            // 解構寫法 同上兩行 更為精簡
            const { token, expired } = res.data;
            // onsole.log(token,expired);//驗證
            // 儲存token跟expired到本地cookie,new Date(expired)可以將expired轉成日期格式
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            // 登入成功跳轉路由
            this.$router.push('/orders');
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
};
</script>
