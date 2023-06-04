// Use CommonJS require below so we can dynamically import during build-time.
if (process.env.NODE_ENV === "production") {
  module.exports = require("./configStore.prod");
} else {
  module.exports = require("./configStore.dev");
}
