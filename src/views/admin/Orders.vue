<template>
  <div>
    <Loading/>
  </div>
  <main class="container mt-3">
    <h2 class="fw-bold">訂單管理</h2>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">訂單建立時間</th>
          <th scope="col">訂單編號</th>
          <th scope="col" class="d-none d-md-table-cell">訂購人姓名</th>
          <th scope="col" class="d-none d-md-table-cell">訂購人電話</th>
          <th scope="col" class="d-none d-md-table-cell">應付金額</th>
          <th scope="col">訂單狀態</th>
          <th scope="col">查看</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody class="fw-bold">
        <tr v-for="item in orders" :key="item.id">
          <td>{{new Date(item.create_at * 1000).getFullYear()+
          "/"+(new Date(item.create_at * 1000).getMonth()+1)+
          "/"+new Date(item.create_at * 1000).getDate()+
          " "+new Date(item.create_at * 1000).getHours()+
          ":"+new Date(item.create_at * 1000).getMinutes()+
          ":"+new Date(item.create_at * 1000).getSeconds()   }}</td>
          <td>{{ item.id }}</td>
          <td class="d-none d-md-table-cell">{{ item.user.name }}</td>
          <td class="d-none d-md-table-cell">{{ item.user.tel }}</td>
          <td class="d-none d-md-table-cell">{{ $toCurrency(item.total) }}</td>
          <td class="text-danger">
            {{ item.is_paid ? '付款完成' : '未付款' }}
          </td>
          <td>
            <button type="button" class="btn btn-primary" @click="goToOrder(item)">
              查看
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-warning" @click="deleteOrder(item)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
// padeLoading component
import Loading from '../../components/Loading.vue';

export default {
  components: {
    // Card,
    Loading,
  },
  data() {
    return {
      id: '',
      orders: [],
      newDate: [],
    };
  },
  methods: {
    getOrdersList() {
      // 管理控制台 [需驗證]-取得訂單列表 /api/:api_path/admin/orders?page=:page
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
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
    goToOrder(item) {
      this.$router.push(`/order/${item.id}`);
    },
    deleteOrder(item) {
      if (window.confirm(`確定刪除${item.id}訂單嗎?`) === true) {
        // 管理控制台 [需驗證] - 刪除訂單 /api/:api_path/admin/order/:id [方法]: delete
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
        this.$http
          .delete(url)
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                title: res.data.message,
              });
              this.getOrdersList();
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
          title: '已取消',
          icon: 'error',
        });
      }
    },
  },
  created() {
    this.getOrdersList();
  },
};
</script>
