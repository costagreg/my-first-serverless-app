export default ({markup, bundleUrl, styleUrl, preloadedState}) => {
  return `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">
        <link rel="stylesheet" type="text/css" href="${styleUrl}">
      </head>
      <body >
        <div id="root">${markup}</div>
        <script>window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}</script>
        <script src="${bundleUrl}"></script>
       </body>
    </html>`
}
