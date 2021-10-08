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
    <div class="col-4">
      <h5 class="fw-bold pt-3">STEP 02</h5>
      <p class="fs-5 fw-bold">輸入訂購資料</p>
    </div>
    <div class="col-4 bg-secondary">
      <h5 class="fw-bold pt-3">STEP 03</h5>
      <p class="fs-5 fw-bold">付款/完成訂單</p>
    </div>
  </div>
  <section class="mx-auto text-start w-75">
    <!-- 訂單區塊 -->
    <div>
      <h2 class="fw-bold">訂單資訊</h2>
      <table class="table">
        <thead class="bg-secondary">
          <tr>
            <th scope="col">品名</th>
            <th scope="col">類別</th>
            <th scope="col">數量</th>
            <th scope="col">價格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartProduct" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.product.category }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td>＄{{ $toCurrency(item.final_total) }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-end">總計：＄{{ $toCurrency(total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 訂購區塊 -->
    <div>
      <h2 class="fw-bold">訂購人資料</h2>
      <table class="table">
        <tbody class="text-start">
          <tr class="bg-secondary row">
            <td class="col-4 fw-bold">姓名：</td>
            <td class="col-8">{{ data.user.name }}</td>
          </tr>
          <tr class="row">
            <td class="col-4 fw-bold">電話：</td>
            <td class="col-8">{{ data.user.tel }}</td>
          </tr>
          <tr class="row">
            <td class="col-4 fw-bold">地址：</td>
            <td class="col-8">{{ data.user.address }}</td>
          </tr>
          <tr class="row">
            <td class="col-4 fw-bold">信箱：</td>
            <td class="col-8">{{ data.user.email }}</td>
          </tr>
          <tr class="row">
            <td class="col-4 fw-bold">備註：</td>
            <td class="col-8">{{ data.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <!-- 回上頁&下一步 -->
  <div class="mb-3">
    <div class="d-flex justify-content-between">
      <router-link class="btn btn-primary" to="/check-orderer"
        >回上頁</router-link
      >
      <button class="btn btn-primary" @click="finishCheckOut_goToComplete"
        >完成訂單</button>
    </div>
  </div>
</template>

<script>
// padeLoading component
import Loading from '../../components/Loading.vue';
import emitter from '../../assets/javascript/emitter';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      cartProduct: [],
      // countPrice: 0,
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
  computed: {
    // 計算總價total 直接顯示於html 當this.cartProduct有任何變化即會再次運作
    total() {
      let total = 0;
      this.cartProduct.forEach((item) => {
        total += item.final_total;
      });
      return total;
    },
  },
  methods: {
    getCartList() {
      // 客戶購物 [免驗證]-取得購物車列表 /api/:api_path/cart get
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      // this.$http 代替axios
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartProduct = res.data.data.carts;
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
    goToCheckOrderer() {
      this.$router.push('/order-complete');
    },
    receiveQuery() {
      this.data.message = this.$route.query.message;
      this.data.user.email = this.$route.query.email;
      this.data.user.name = this.$route.query.name;
      this.data.user.tel = this.$route.query.tel;
      this.data.user.address = this.$route.query.address;
    },
    finishCheckOut_goToComplete() {
      if (window.confirm('已確定資料無誤，確定送出訂單嗎?') === true) {
        // 客戶購物 [免驗證]-結帳頁面 /api/:api_path/order [方法]: post
        const { data } = this;
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
        this.$http
          .post(url, { data })
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: res.data.message,
              });
              this.goToCheckOrderer();
              // 對應front.vue的emitter監聽
              emitter.emit('updata-cart');
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
      }
    },
  },
  created() {
    this.getCartList();
    this.receiveQuery();
  },
};
</script>
