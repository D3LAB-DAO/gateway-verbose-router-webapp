<!-- <script setup> -->
<script>
import { connectMetamask, getAddress } from "../assets/js/wallet";
export default {
  data() {
    return {
      connected: false,
      btnText: "Connect to wallet",
    };
  },
  mounted() {},
  methods: {
    connectOnClick: async function () {
      if (getAddress() !== undefined) return;

      const success = await connectMetamask();
      if (success) {
        console.log("metamask successfully connected!");
        this.btnText = getAddress();
      } else {
        console.log("metamask connection failed!");
        this.btnText = "metamask required!";
      }
    },
  },
};
</script>

<template>
  <div class="uk-navbar-container nav" uk-navbar>
    <div class="uk-navbar-left"><img class="logo" src="/logo.png" /></div>
    <div class="uk-navbar-right">
      <button class="btn uk-button" @click="connectOnClick">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 36px;
}
.btn {
  background-color: #ffffffee;
  border-radius: 10px;
  font-weight: 500;
}
.nav {
  padding: 10px 30px 10px 30px;
  background-color: transparent;
  border-bottom: 1px solid #eeeeee;
}
</style>
