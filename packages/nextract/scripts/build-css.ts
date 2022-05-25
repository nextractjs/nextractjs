/**
 * This script is used to statically build a css file that includes all styles from the Nextract.js components.
 *
 * In development, the dev app (see /apps/dev) uses Tailwind CSS itself to build the styles dynamically.
 * In production, the styles are statically built (by this script) and included in the Nextract.js components.
 */

import fs from 'fs'
import { exec } from 'child_process'

// Build all styles
exec('npx tailwindcss -i ./src/css/base.css -o ./css/out.css', (err) => {
  if (err) throw new Error('Failed to build CSS via Tailwindcss: ' + err.message)

  // Read the output file
  const css = fs.readFileSync('./css/out.css', 'utf8')
  const cssStringSafe = JSON.stringify(css).slice(1, -1)

  // Write the js file that passes the CSS to the app
  fs.writeFileSync('./css/index.js', `module.exports = function() { return "${cssStringSafe}" }`)

  // Remove the temporary files
  try {
    fs.unlinkSync('./css/base.css')
    fs.unlinkSync('./css/out.css')
  } catch (err: any) {
    console.warn(`Failed to remove temporary css file: ${err.message}`)
  }
})
