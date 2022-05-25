const base = require("tailwind/tailwind.config")

module.exports = {
    ...base,
    content: ["../../packages/nextract/src/**/*.(ts|tsx)", "./pages/**/*.(ts|tsx)"],
  }
  