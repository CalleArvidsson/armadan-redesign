declare module 'jwt-decode' {
  interface IDecodedToken {
    email: string
    exp: number
    iat: number
    id: string
    role: string
    sub: string
  }

  export default function(token: string): IDecodedToken 
}