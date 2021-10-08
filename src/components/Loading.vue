<template>
  <loading v-model:active="isLoading"></loading>
</template>

<!--js部分-->
<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    isloading() {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
  },
  created() {
    this.isloading();
  },
};
</script>

<!--css部分-->
<style lang="scss">
</style>
