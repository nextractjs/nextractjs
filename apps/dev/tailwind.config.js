const base = require("tailwind/tailwind.config")

module.exports = {
    ...base,
    // Generate tailwind classes based on the package source code
    content: ["../../packages/nextract/src/**/*.(ts|tsx)", "./pages/**/*.(ts|tsx)"],
  }
  