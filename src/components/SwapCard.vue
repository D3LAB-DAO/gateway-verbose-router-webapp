<script>
import {
  getTokenList,
  getTokenA,
  getTokenB,
  setTokenA,
  setTokenB,
  getInputA,
  getInputB,
  setInputA,
  setInputB,
  setLastUpdatedIndex,
  getTokenBalance,
  getTokenDecimals,
} from "../assets/js/router";
import { getIsConnected } from "../assets/js/wallet";
import { watchEffect } from "vue";
import BigNumber from "bignumber.js";

export default {
  props: ["index"],
  data() {
    return {
      tokens: [],
      selectedToken: this.index === 0 ? getTokenA() : getTokenB(),
      inputAmount: this.index === 0 ? getInputA() : getInputB(),
      decimals: new BigNumber(18), // default
    };
  },
  mounted() {
    this.tokens = getTokenList();

    watchEffect(async () => {
      const res = await getTokenDecimals(this.selectedToken);
      if (res !== null) {
        this.decimals = new BigNumber(res);
      } else {
        this.decimals = new BigNumber(18); // default
      }
    });
  },
  computed: {
    displayedInputAmount: {
      get() {
        // convert the original value to the display value
        return new BigNumber(this.inputAmount)
          .div(new BigNumber(10).pow(this.decimals))
          .toFixed();
      },
      set(value) {
        // convert the display value back to the original value
        this.inputAmount = new BigNumber(value)
          .times(new BigNumber(10).pow(this.decimals))
          .toFixed();
      },
    },
  },
  methods: {
    async getMaxBalance() {
      if (getIsConnected().value) {
        const maxBalance = await getTokenBalance(this.selectedToken);
        if (maxBalance !== null) {
          this.inputAmount = maxBalance;
        } else {
          this.inputAmount = 0; // default
        }
      }
    },
  },
  watch: {
    selectedToken(newVal) {
      if (this.index === 0) {
        setTokenA(newVal);
      } else if (this.index === 1) {
        setTokenB(newVal);
      }
    },
    inputAmount(newVal) {
      if (this.index === 0) {
        setInputA(newVal);
        setLastUpdatedIndex(0);
      } else if (this.index === 1) {
        setInputB(newVal);
        setLastUpdatedIndex(1);
      }
    },
  },
};
</script>

<template>
  <div class="uk-width-1-1" uk-grid>
    <div class="input-div uk-width-4-5@s uk-width-1-1">
      <input
        class="input uk-input uk-form-large"
        type="number"
        step="1"
        min="0"
        aria-label="Input"
        v-model="displayedInputAmount"
      />
      <span class="uk-badge max-button" @click="getMaxBalance">max</span>
    </div>
    <div class="select-div uk-width-1-5@s uk-width-1-1">
      <select
        class="select uk-select"
        aria-label="Select"
        v-model="selectedToken"
      >
        <option selected disabled class="default-option">select</option>
        <option v-for="token in tokens" :key="token" :value="token">
          {{ token }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .uk-grid {
    /* margin: 0px; */
    margin-bottom: 30px;
  }
}

.input {
  width: 85%;
  border: none;
  background-color: transparent;
}

.max-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* right: -20px; */
  /* margin-right: -20px; */
  padding: 10px;
  /* border: 10px solid transparent; */
}
.max-button:hover {
  cursor: pointer;
  background-color: #eeeeee;
}

.input-div,
.select-div {
  position: relative;
}

.select {
  /* width: 25%; */
  border: none;
  background-color: #eeeeee;
  border-radius: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.select:focus .default-option {
  display: none;
}
</style>
