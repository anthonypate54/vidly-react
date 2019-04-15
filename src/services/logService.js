//import Raven from "raven-js";

function init() {
  //   Raven.config("https://1d582699f16f4e41bdf7609db35e62ac@sentry.io/1429524", {
  //     release: "1-0-0",
  //     environment: "development-test"
  //   }).install();
}

function log(error) {
  console.error(error);
  //   Raven.captureException(error);
}

export default {
  init,
  log
};
