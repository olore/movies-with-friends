/// <reference types="cypress" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// https://github.com/mjhea0/cypress-visual-regression
const getCompareSnapshotsPlugin = require("cypress-visual-regression/dist/plugin");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  getCompareSnapshotsPlugin(on, config);

  on("before:browser:launch", (browser, launchOptions) => {
    if (browser.isHeadless) {
      // fullPage screenshot size is 1400x1200 on non-retina screens
      // and 2800x2400 on retina screens
      launchOptions.args.push("--window-size=1400,1200");

      // force screen to be non-retina (1400x1200 size)
      // launchOptions.args.push("--force-device-scale-factor=1");

      // force screen to be retina (2800x2400 size)
      // launchOptions.args.push('--force-device-scale-factor=2')
    }
  });

  // https://github.com/component-driven/cypress-axe
  on("task", {
    log(message) {
      console.log(message);

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
  });
};
