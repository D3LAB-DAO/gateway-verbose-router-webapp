<script>
import { ref } from "vue";
import SwapCard from "./SwapCard.vue";
import Setting from "./Setting.vue";
import {
  getTokenA,
  getTokenB,
  setTokenA,
  setTokenB,
} from "../assets/js/router";

export default {
  data() {
    return {
      isSpinning: false,
    };
  },
  components: {
    SwapCard,
    Setting,
  },
  methods: {
    swapTokens() {
      const tokenA = getTokenA().value;
      const tokenB = getTokenB().value;
      setTokenA(tokenB);
      setTokenB(tokenA);

      this.isSpinning = true;
      setTimeout(() => {
        this.isSpinning = false;
      }, 500); // same as the animation duration
    },
  },
};
</script>

<template>
  <div class="container">
    <h3 class="subtitle">Trade</h3>
    <div class="card">
      <SwapCard :index="0" />
    </div>
    <div class="icon-div">
      <a
        class="uk-icon-button"
        uk-icon="arrow-down"
        @click="swapTokens"
        :class="{ 'spin-animation': isSpinning }"
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <polygon
            points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66"
            stroke="#0f7ae5"
            stroke-width="1.8"
          ></polygon>
          <line
            fill="#none"
            stroke="#0f7ae5"
            stroke-width="3"
            x1="10.5"
            y1="4"
            x2="10.5"
            y2="15"
          ></line>
        </svg>
      </a>
    </div>
    <div class="card">
      <SwapCard :index="1" />
    </div>
    <hr />
    <div>
      <Setting />
    </div>
    <hr />
    <div class="uk-text-center">
      <button class="btn uk-button uk-button-primary btn-large">Swap</button>
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

.btn-large {
  height: 60px;
  font-size: 18px;
  font-weight: bold;
}

.spin-animation {
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
}
</style>
