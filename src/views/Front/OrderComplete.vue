<template>
  <div>
    <Loading/>
  </div>
  <div
    class="container w-50 text-center mb-3 animate__animated animate__fadeIn"
  >
    <h2 class="fw-bold">感謝您訂單已完成！</h2>
    <p class="fs-5">感謝您對<span class="caveat fs-3">FIV5 </span>手造的支持</p>
    <p class="fs-5">商品預計將在3～5個工作天送至府上，屆時請取貨付款，感謝！</p>
    <router-link class="btn btn-primary" to="/index">回首頁</router-link>
  </div>
</template>

<script>
// padeLoading component
import Loading from '../../components/Loading.vue';

export default {
  components: {
    Loading,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
.caveat {
  font-family: 'Caveat', cursive;
}
</style>
