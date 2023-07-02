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
      return /^\d+(\.\d+)?$/.test(value) && value <= 100;
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
                <div class="uk-width-1-1" uk-grid>
                  <div class="uk-width-1-5@s uk-width-1-1">
                    <button
                      class="uk-width-1-1 slippage-item slippage-button uk-button"
                      :class="{ 'uk-button-primary': slippage == '0.1' }"
                      @click.prevent="toggleInput('0.1')"
                    >
                      0.1
                    </button>
                  </div>
                  <div class="uk-width-1-5@s uk-width-1-1">
                    <button
                      class="uk-width-1-1 slippage-item slippage-button uk-button"
                      :class="{ 'uk-button-primary': slippage == '0.5' }"
                      @click.prevent="toggleInput('0.5')"
                    >
                      0.5
                    </button>
                  </div>
                  <div class="uk-width-1-5@s uk-width-1-1">
                    <button
                      class="uk-width-1-1 slippage-item slippage-button uk-button"
                      :class="{ 'uk-button-primary': slippage == '1.0' }"
                      @click.prevent="toggleInput('1.0')"
                    >
                      1.0
                    </button>
                  </div>
                  <div class="uk-width-2-5@s uk-width-1-1">
                    <button
                      class="uk-width-1-2 slippage-item slippage-button uk-button"
                      :class="{ 'uk-button-primary': slippage == 'custom' }"
                      @click.prevent="toggleInput('custom')"
                    >
                      Custom
                    </button>
                    <input
                      class="uk-width-1-2 slippage-item uk-input"
                      id="form-horizontal-text"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value="5.0"
                      disabled
                      v-on:input="updateSlippage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.uk-button-primary {
  border: none;
}
.uk-input {
  border: 1px solid transparent;
  box-shadow: 0 0 0 1px #e5e5e5 inset;
}
.uk-grid {
  margin-left: -5px;
}
.uk-grid-margin {
  margin-top: 10px;
}
.uk-grid > * {
  padding-left: 10px;
}

.uk-form-label {
  font-weight: 500;
  width: 120px;
  margin-left: 5px;
  margin-bottom: 10px;
}

.slippage-button {
  padding: 0px;
}

.slippage-item {
  /* height: 36px; */
}
</style>