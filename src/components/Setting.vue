<script>
import { getSlippage, setSlippage } from "../assets/js/router";
export default {
  data() {
    return {
      slippage: getSlippage(),
    };
  },
  mounted() {},
  methods: {
    handleFormSubmit(event) {
      event.preventDefault();
    },
    toggleInput(value) {
      this.slippage = value;
      var customInput = document.getElementById("form-horizontal-text");
      if (value === "custom") {
        customInput.disabled = false;
      } else {
        customInput.disabled = true;
        this.updateSlippage({ target: { value: value } }); // simulate an event object
      }
    },
    updateSlippage(event) {
      if (this.isFloat(event.target.value)) {
        // console.log("setSlippage", event.target.value);
        setSlippage(event.target.value);
      } else {
        // handle non-float values
      }
    },
    isFloat(value) {
      return /^\-?\d+(\.\d+)?$/.test(value);
    },
  },
};
</script>

<template>
  <div>
    <ul uk-accordion>
      <li>
        <a class="uk-accordion-title subtitle" href="#">Settings</a>
        <div class="uk-accordion-content">
          <form
            class="uk-form-horizontal uk-margin-large"
            @submit.prevent="handleFormSubmit"
          >
            <div class="uk-margin">
              <div class="uk-form-label">Slippage</div>
              <div class="uk-flex uk-flex-between uk-margin-bottom">
                <button
                  class="uk-button uk-width-1-4 uk-margin-small-right"
                  :class="{ 'uk-button-primary': slippage == '0.1' }"
                  @click.prevent="toggleInput('0.1')"
                >
                  0.1
                </button>
                <button
                  class="uk-button uk-width-1-4 uk-margin-small-right"
                  :class="{ 'uk-button-primary': slippage == '0.5' }"
                  @click.prevent="toggleInput('0.5')"
                >
                  0.5
                </button>
                <button
                  class="uk-button uk-width-1-4 uk-margin-small-right"
                  :class="{ 'uk-button-primary': slippage == '1.0' }"
                  @click.prevent="toggleInput('1.0')"
                >
                  1.0
                </button>
                <button
                  class="uk-button uk-width-1-4"
                  :class="{ 'uk-button-primary': slippage == 'custom' }"
                  @click.prevent="toggleInput('custom')"
                >
                  Custom
                </button>
              </div>
              <input
                class="uk-input"
                id="form-horizontal-text"
                type="text"
                placeholder="Type Custom Slippage ..."
                disabled
                v-on:input="updateSlippage"
              />
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>
