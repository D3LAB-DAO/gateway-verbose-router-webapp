<script setup>
import SwapCard from "./SwapCard.vue";
import Setting from "./Setting.vue";
</script>

<template>
  <div class="container">
    <h3 class="subtitle">Trade</h3>
    <div class="card">
      <SwapCard />
    </div>
    <div class="icon-div">
      <a class="uk-icon-button" uk-icon="arrow-down">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <polygon
            points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"
          ></polygon>
          <line fill="#none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15"></line>
        </svg>
      </a>
    </div>
    <div class="card">
      <SwapCard />
    </div>
    <hr />
    <div>
      <Setting />
    </div>
    <hr />
    <div class="uk-text-center">
      <button class="btn uk-button uk-button-primary">Swap</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  padding: 30px;
  margin-top: 10px;
  border-radius: 10px;
}
.btn {
  width: 100%;
  border-radius: 10px;
}

.icon-div {
  position: relative;
  width: 100%;
}
.uk-icon-button {
  width: 30px;
  height: 30px;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-background-soft);
  color: #0f7ae5;
}
</style>
