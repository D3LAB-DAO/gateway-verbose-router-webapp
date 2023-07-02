<script>
import { getTokenList, setTokenA, setTokenB } from "../assets/js/router";
export default {
  props: ["index"],
  data() {
    return {
      tokens: [],
    };
  },
  mounted() {
    this.tokens = getTokenList();
  },
  methods: {
    handleSelectChange(e) {
      if (this.index === 0) {
        setTokenA(e.target.value);
      } else if (this.index === 1) {
        setTokenB(e.target.value);
      }
    },
  },
};
</script>

<template>
  <div>
    <input
      class="input uk-input uk-form-large"
      type="text"
      placeholder="Input"
      aria-label="Input"
    />
    <select
      class="select uk-select"
      aria-label="Select"
      @change="handleSelectChange"
    >
      <option selected disabled class="default-option">select</option>
      <option v-for="token in tokens" :key="token" :value="token">
        {{ token }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.input {
  width: 60%;
  border: none;
  background-color: transparent;
}
.select {
  width: 30%;
  border: none;
  background-color: #eeeeee;
  border-radius: 30px;
  position: relative;
  left: 10%;
}

.select:focus .default-option {
  display: none;
}
</style>
