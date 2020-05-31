module.exports =  (markup, bundle) => {
  return `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">
      </head>
      <body >
        <div id="root">${markup}</div>
        <script src="${bundle}"></script>
       </body>
    </html>`
}