import "@emotion/react"

declare module '@emotion/react' {
  export interface Theme {
    color: {
      [key: string]: string
    }
    mode: string
    [key: string]: { [key: string]: string }
    [key: string]: { [key: string]: { [key: string]: string } }
  }
}
