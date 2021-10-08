<template>
  <div>
    <Loading/>
  </div>
  <!-- 目前動作區塊 -->
  <div class="row text-center">
    <div class="col-4 bg-secondary">
      <h5 class="fw-bold pt-3">STEP 01</h5>
      <p class="fs-5 fw-bold">確認訂單商品</p>
    </div>
    <div class="col-4">
      <h5 class="fw-bold pt-3">STEP 02</h5>
      <p class="fs-5 fw-bold">輸入訂購資料</p>
    </div>
    <div class="col-4">
      <h5 class="fw-bold pt-3">STEP 03</h5>
      <p class="fs-5 fw-bold">付款/完成訂單</p>
    </div>
  </div>
  <!-- 訂單產品 -->
  <div class="content">
    <div class="table-wrap">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="text-center">商品資訊</th>
            <th scope="col" class="d-none d-sm-table-cell">商品名稱 <i class="bi bi-alarm"></i></th>
            <th scope="col">數量</th>
            <th scope="col" class="d-none d-md-table-cell">單價</th>
            <th scope="col" class="d-none d-md-table-cell">折扣價</th>
            <th scope="col">小計</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartProduct" :key="item.id">
            <td class="d-flex align-items-center">
              <div class="d-black d-sm-none text-center">
              {{ item.product.title }}
              </div>
              <img
                style="
                  width: 150px;
                  height: 150px;
                  background-size: cover;
                  background-position: center;
                "
                :src="item.product.imageUrl"
              >
            </td>
            <td class="d-none d-sm-table-cell">{{ item.product.title }}</td>
            <td>
              <input
                min="1"
                max="99"
                type="number"
                v-model.number="item.qty"
                class="form-control"
                ref="qty"
                @change="updataProductQty(item)"
              />
            </td>
            <td class="d-none d-md-table-cell">
              {{ $toCurrency(item.product.origin_price) }}
            </td>
            <td class="d-none d-md-table-cell">
              {{ $toCurrency(item.product.price) }}
            </td>
            <td>{{ $toCurrency(item.total) }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="deleteProduct(item.id)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 計算區塊 -->
    <div class="row justify-content-md-end text-md-end">
      <div class="col-12 col-md-9">共{{ cartProduct.length }}項</div>
<!-- {{ $toCurrency(countPrice) }} -->
      <div class="col-12 col-md-3">總金額: {{ $toCurrency(countTotalPrice) }}</div>
    </div>
    <!-- 下一步 -->
    <div class="mb-3">
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-primary" @click="deleteAllProducts">
          清空購物車
        </button>
        <router-link class="btn btn-primary" to="/check-orderer"
          >下一步</router-link
        >
      </div>
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
      id: '',
      cartProduct: [],
    };
  },
  computed: {
    // countPrice 直接顯示於html 當this.cartProduct有任何變化即會再次運作
    countTotalPrice() {
      let total = 0;
      this.cartProduct.forEach((item) => {
        total += (item.product.price * item.qty);
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
    deleteProduct(id) {
      // 客戶購物 [免驗證]-刪除某一筆購物車資料 /api/:api_path/cart/:id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$swal({
              title: res.data.message,
            });
            this.getCartList();
            this.countPrice = 0;
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
    },
    deleteAllProducts() {
      // 客戶購物 [免驗證]-刪除全部購物車 /api/:api_path/carts
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$swal({
              title: res.data.message,
            });
            this.getCartList();
            this.countPrice = 0;
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
    },
    productQtyAdd() {},
    productQtySubtract() {},
    updataProductQty(item) {
      if (item.qty > 0) {
        const data = {
          product_id: item.id,
          qty: item.qty,
        };
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        this.$http
          .put(url, { data })
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: res.data.message,
              });
              this.getCartList();
              this.countPrice = 0;
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
      } else {
        this.$swal({
          title: '數量不可小於零',
          icon: 'error',
        });
      }
    },
  },
  created() {
    this.getCartList();
  },
};
</script>
