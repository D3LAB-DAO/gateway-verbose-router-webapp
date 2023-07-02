<script setup>
import Wallet from "./components/Wallet.vue";
import Swap from "./components/Swap.vue";
</script>

<template>
  <Wallet />
  <div class="container container-card">
    <Swap />
  </div>
</template>

<style scoped>
.container-card {
  margin-top: 30px;
  background-color: #ffffff99;
  box-shadow: 0 15px 23px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}
</style>
