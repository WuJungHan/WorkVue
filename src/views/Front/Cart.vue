<template>
  <main class="container mt-3">
    <nav class="border-bottom pb-3 mb-3">
      <div>
        <router-link aria-current="page" to="/index"
          >FIV5品牌首頁</router-link
        >/
        <router-link aria-current="page" to="/cart"
          >FIV5購物車</router-link
        >
      </div>
    </nav>
    <router-view></router-view>
  </main>
</template>
