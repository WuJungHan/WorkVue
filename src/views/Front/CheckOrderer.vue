<template>
  <div>
    <Loading/>
  </div>
  <!-- 目前動作區塊 -->
  <div class="row text-center">
    <div class="col-4">
      <h5 class="fw-bold pt-3">STEP 01</h5>
      <p class="fs-5 fw-bold">確認訂單商品</p>
    </div>
    <div class="col-4 bg-secondary">
      <h5 class="fw-bold pt-3">STEP 02</h5>
      <p class="fs-5 fw-bold">輸入訂購資料</p>
    </div>
    <div class="col-4">
      <h5 class="fw-bold pt-3">STEP 03</h5>
      <p class="fs-5 fw-bold">付款/完成訂單</p>
    </div>
  </div>
  <!-- 訂購人資料 -->
  <section class="content w-75 mx-auto">
    <!-- <h2 class="fw-bold">訂購人資料</h2> -->
    <div class="row">
      <div class="col-12">
        <Form class="fs-5 text" v-slot="{ errors }">
          <div class="mb-3">
            <!-- 訂購人姓名 -->
            <!-- <label for="ordererName">訂購人姓名</label> -->
            <!-- <Field
              type="name"
              class="form-control"
              id="ordererName"
              aria-describedby="ordererNameHelp"
              name="訂購人姓名"
              placeholder="請輸入訂購人姓名"
              :class="{ 'is-invalid': errors['訂購人姓名'] }"
              rules="required"
              v-model="orderForm.ordererName"
            ></Field>
            <ErrorMessage name="訂購人姓名" class="invalid-feedback"></ErrorMessage>
            <div id="ordererNameHelp" class="form-text text-warning fs-5"></div> -->
            <!-- 收件人資料 -->
            <h2 class="fw-bold">請填寫訂購資料</h2>
            <!-- 姓名 -->
            <label for="orderName">姓名</label>
            <Field
              type="name"
              class="form-control"
              id="orderName"
              aria-describedby="orderNameHelp"
              name="姓名"
              placeholder="請輸入姓名"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              v-model="data.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            <div id="orderNameHelp" class="form-text text-warning fs-5"></div>
            <!-- 電話 -->
            <label for="orderTel">電話</label>
            <Field
              type="tel"
              class="form-control"
              id="orderTel"
              aria-describedby="orderTelHelp"
              name="電話"
              placeholder="請輸入電話"
              :class="{ 'is-invalid': errors['電話'] }"
              rules="required|min:8|numeric"
              v-model.number="data.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            <div id="orderTelHelp" class="form-text text-warning fs-5"></div>
            <!-- 地址 -->
            <label for="orderAddress">地址</label>
            <Field
              type="address"
              class="form-control"
              id="orderAddress"
              aria-describedby="orderAddressHelp"
              name="地址"
              placeholder="請輸入地址"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required"
              v-model="data.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            <div
              id="orderAddressHelp"
              class="form-text text-warning fs-5"
            ></div>
            <!-- 信箱 -->
            <label for="ordererEmail">信箱</label>
            <Field
              type="email"
              class="form-control"
              id="ordererEmail"
              aria-describedby="ordererEmailHelp"
              name="信箱"
              placeholder="請輸入信箱"
              :class="{ 'is-invalid': errors['信箱'] }"
              rules="email|required"
              v-model="data.user.email"
            ></Field>
            <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
            <div
              id="ordererEmailHelp"
              class="form-text text-warning fs-5 mb-5"
            ></div>
            <!-- 備註 -->
            <label for="message">備註</label><br />
            <textarea
              id="message"
              name="message"
              v-model="data.message"
              style="resize: none; width: 100%; height: 80px"
              maxlength="30"
              placeholder="請輸入備註,最多30個字"
            ></textarea>
          </div>
        </Form>
      </div>
    </div>
  </section>
  <!-- 回上頁&下一步 -->
  <div class="mb-3">
    <div class="d-flex justify-content-between">
      <router-link class="btn btn-primary" to="/cart">回上頁</router-link>
      <button type="button" class="btn btn-primary" @click="goToCheckOrderComplete">
        下一步
      </button>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
// padeLoading component
import Loading from '../../components/Loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      data: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    goToCheckOrderComplete() {
      if (
        this.data.user.email !== '' && this.data.user.name !== '' && this.data.user.tel !== '' && this.data.user.address !== ''
      ) {
        const { message } = this.$data.data;
        const { address } = this.$data.data.user;
        const { email } = this.$data.data.user;
        const { name } = this.$data.data.user;
        const { tel } = this.$data.data.user;
        this.$router.push({
          path: '/check-order-complete',
          query: {
            message,
            address,
            email,
            name,
            tel,
          },
        });
      } else {
        this.$swal({
          title: '請將資料填寫完畢',
          icon: 'error',
        });
      }
    },
  },
};
</script>
