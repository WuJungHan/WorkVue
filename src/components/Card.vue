<!--html 放入bs5 card元件結構-->
<template>
  <div class="card" style="width: 18rem;">
  <img src="" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">title</h5>
    <p class="card-text">Some quick example text to build
      on the card title and make up the bulk of the card's content.</p>
    <button
              type="button"
              class="btn btn-primary"
              @click="goToProductPage(item)"
            >
              立即選購
            </button>
  </div>
</div>
</template>

<!--js部分-->
<script>
export default {};
</script>

<!--css部分-->
<style lang="scss">
</style>
