<template>
  <nav class="text-center" v-show="page.total_pages > 1">
    <ul class="pagination d-flex justify-content-center my-4">
      <li class="page-item" :class="page.has_pre ? '' : 'disabled'">
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('get-datas', page.current_page - 1)"
        >
          <span>&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(item, key) in page.total_pages"
        :key="key"
        :class="item === page.current_page ? 'active' : ''"
      >
        <a class="page-link" href="#" @click.prevent="$emit('get-datas', item)">
          {{ item }}</a
        >
      </li>
      <li class="page-item" :class="page.has_next ? '' : 'disabled'">
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('get-datas', page.current_page + 1)"
        >
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page'],
  created() {
    console.log(this.page);
  },
};
</script>
