export default (markup, bundle, style) => {
  return `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">
        <link rel="stylesheet" type="text/css" href="${style}">
      </head>
      <body >
        <div id="root">${markup}</div>
        <script src="${bundle}"></script>
       </body>
    </html>`
}
