<script>
import SwapCard from "./SwapCard.vue";
import Setting from "./Setting.vue";
import { change, swap } from "../assets/js/router";
import { connectMetamask, getIsConnected } from "../assets/js/wallet";

export default {
  data() {
    return {
      isSpinning: false,
      firstLoad: true,
    };
  },
  components: {
    SwapCard,
    Setting,
  },
  computed: {
    buttonText() {
      return getIsConnected().value ? "Swap" : "Connect";
    },
  },
  methods: {
    changeTokens() {
      change();

      this.isSpinning = true;
      setTimeout(() => {
        this.isSpinning = false;
      }, 500); // same as the animation duration
    },
    async swapTokens() {
      await swap();
    },
    async buttonAction() {
      if (getIsConnected().value) {
        await this.swapTokens();
      } else {
        const success = await connectMetamask();
        if (success) {
          console.log("metamask successfully connected!");
        } else {
          console.log("metamask connection failed!");
        }
      }
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
        @click="changeTokens"
        :class="{ 'first-load': firstLoad }"
        @mouseover="firstLoad = false"
      >
        <!-- :class="{ 'spin-animation': isSpinning }" -->
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
      <button
        class="btn uk-button uk-button-primary btn-large"
        @click="buttonAction"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  /*
  box-shadow: 0 1px 1px rgba(0,0,0,0.04);
  */
}

.card:hover {
  box-shadow: 0 3px 3px rgba(0,0,0,0.04);
}

.btn {
  width: 100%;
  font-size: 0.9rem !important;
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

.uk-icon-button:not(.first-load) {
  animation: spin-out 0.2s linear;
}

.uk-icon-button:hover {
  animation: spin 0.2s linear forwards;
}

.btn-large {
  height: 60px;
  font-size: 1rem;
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
    transform: translateX(-50%) rotate(180deg);
  }
}

@keyframes spin-out {
  from {
    transform: translateX(-50%) rotate(180deg);
  }
  to {
    transform: translateX(-50%) rotate(0deg);
  }
}
</style>
