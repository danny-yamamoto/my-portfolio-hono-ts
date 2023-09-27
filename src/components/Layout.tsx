import { html } from 'hono/html'

export const Layout = (props: { title: string; children?: any; }) => {
  return html`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${props.title}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </head>
      <body style="padding: 1em 2em; background: linear-gradient(83.21deg,#3245ff 0%,#bc52ee 100%); color: white; height: 100vh;">
        <header>
          <h1>
            <a href="/" class="fa-inverse">Welcome to my portfolio</a>
          </h1>
        </header>
        ${props.children}
      </body>
    </html>`
}
