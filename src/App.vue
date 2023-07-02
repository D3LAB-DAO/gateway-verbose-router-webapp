<script setup>
import Wallet from "./components/Wallet.vue";
import Swap from "./components/Swap.vue";
</script>

<template>
  <Wallet />
  <div class="outer-container">
    <div class="container container-card">
      <Swap />
    </div>
  </div>
</template>

<style scoped>
.outer-container {
  padding: 20px;
}
.container-card {
  background-color: #ffffff99;
  box-shadow: 0 15px 23px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}
</style>
