<script>
import { getTokenList, getTokenA, getTokenB } from "../assets/js/router";
export default {
  props: ["index"],
  data() {
    return {
      tokens: [],
      selectedToken: this.index === 0 ? getTokenA() : getTokenB(),
    };
  },
  mounted() {
    this.tokens = getTokenList();
  },
  // watch: {
  //   selectedToken(newVal) {
  //     if (this.index === 0) {
  //       setTokenA(newVal);
  //     } else if (this.index === 1) {
  //       setTokenB(newVal);
  //     }
  //   },
  // },
};
</script>

<template>
  <div class="uk-width-1-1" uk-grid>
    <div class="input-div uk-width-3-4@s uk-width-1-1">
      <input
        class="input uk-input uk-form-large"
        type="text"
        placeholder="Input"
        aria-label="Input"
      />
      <span class="uk-badge max-button">max</span>
    </div>
    <div class="select-div uk-width-1-4@s uk-width-1-1">
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
  right: 0%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: -20px;
}
.max-button:hover {
  cursor: pointer;
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
