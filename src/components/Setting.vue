<template>
  <div>
    <ul uk-accordion>
      <li>
        <a class="uk-accordion-title subtitle" href="#">Settings</a>
        <div class="uk-accordion-content">
          <form class="uk-form-horizontal uk-margin-large">
            <div class="uk-margin">
              <div class="uk-form-label">Slippage</div>
              <div class="uk-form-controls uk-form-controls-text">
                <label><input class="uk-radio" type="radio" name="radio1" /> 0.1</label
                ><br />
                <label><input class="uk-radio" type="radio" name="radio1" /> 0.5</label
                ><br />
                <label><input class="uk-radio" type="radio" name="radio1" /> 1.0</label
                ><br />
                <label
                  ><input class="uk-radio" type="radio" name="radio1" /> custom</label
                >
                <input
                  class="uk-input"
                  id="form-horizontal-text"
                  type="text"
                  placeholder="Some text..."
                />
              </div>
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
