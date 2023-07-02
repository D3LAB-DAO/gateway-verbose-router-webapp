<!-- <script setup> -->
<script>
import {
  getIsConnected,
  connectMetamask,
  getAddress,
} from "../assets/js/wallet";
import { watchEffect } from "vue";

export default {
  data() {
    return {
      btnText: "Connect",
    };
  },
  mounted() {
    watchEffect(async () => {
      if (getIsConnected().value) {
        this.btnText = await getAddress();
      }
    });
  },
  computed: {
    truncatedBtnText() {
      if (this.btnText.length > 15) {
        return (
          this.btnText.substring(0, 6) +
          "..." +
          this.btnText.substring(this.btnText.length - 4)
        );
      } else {
        return this.btnText;
      }
    },
  },
  methods: {
    connectOnClick: async function () {
      const success = await connectMetamask();
      if (success) {
        console.log("metamask successfully connected!");
      } else {
        console.log("metamask connection failed!");
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
        {{ truncatedBtnText }}
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
