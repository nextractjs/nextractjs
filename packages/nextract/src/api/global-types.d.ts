export {}
declare global {
  interface StaticImageData {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: NextractUser
  }
}
