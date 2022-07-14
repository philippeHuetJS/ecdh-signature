declare module 'ecdh-signature' {
  export function sign(data: string): string
  export function verify(data: string, sig: string): boolean
}
