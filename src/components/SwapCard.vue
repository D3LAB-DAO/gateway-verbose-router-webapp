<script setup></script>

<template>
  <div>
    <input class="input uk-input uk-form-large" type="text" placeholder="Input" aria-label="Input" />
    <select class="select uk-select" aria-label="Select">
      <option>Option 01</option>
      <option>Option 02</option>
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
</style>
