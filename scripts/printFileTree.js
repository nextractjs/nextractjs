const fs = require('fs')
const { execSync } = require('child_process')

const dirs = fs.readdirSync('./packages')

let comment =
  '👋 Hey! Once this PR is merged, the above packages will be released.\n\nThey will include the following files:'

for (const dir of dirs) {
  // Any directory that is not a database or the main nextract directory should be ignored
  if ((dir !== 'nextract' && !dir.startsWith('database-')) || dir === 'database-test') continue

  const root = `${__dirname}/../packages/${dir}`
  const packedFile = `${root}/pack.tgz`
  const unpackedDir = `${root}/package`

  execSync(`yarn --silent --cwd ${root} pack --filename ${packedFile}`)
  execSync(`mkdir -p ${unpackedDir}`)
  execSync(`tar zxvf ${packedFile} -C ${unpackedDir}`)

  const fileTree = execSync(`tree ${unpackedDir}/package`).toString()
  const fileTreeWithoutTitle = fileTree.substring(fileTree.indexOf('\n') + 1)
  const packageName = dir === 'nextract' ? dir : `@nextract/${dir}`

  comment += `\n\n${packageName}\n${fileTreeWithoutTitle}`

  try {
    fs.rmSync(unpackedDir, { recursive: true, force: true })
    fs.unlinkSync(packedFile)
  } catch (err) {
    console.warn('Failed to remove temporary files to prepare comment:', err.message)
  }
}

console.log(comment)
