<!-- 元件引用範例 -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <!-- 將card元件放置畫面 -->
  <Card></Card>
</template>

<!--載入card元件-->
<script>
// ..可替換成@=src資料夾
import Card from '../components/Card.vue';

export default {
  // 區域註冊元件
  components: {
    Card,
  },
  // 建立created 生命週期
  created() {
    // 用this.$http.方法 來調用vue axios 就不用每次都需要  import
    // 查看.env檔 變數使用process.env.VUE_APP_自訂義名稱
  },
};
</script>
