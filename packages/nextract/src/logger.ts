const logger = {
  error(code: string, ...message: any[]) {
    console.error(`[nextract][error][${code.toLowerCase()}]`, ...message)
  },
  warn(code: string, ...message: any[]) {
    console.warn(`[nextract][warn][${code.toLowerCase()}]`, ...message)
  },
  debug(code: string, ...message: any[]) {
    if (!process?.env?.NEXTRACT_DEBUG) return
    console.log(`[nextract][debug][${code.toLowerCase()}]`, ...message)
  },
}

export default logger
