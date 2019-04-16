const server = require('express')()
const favicon = require('serve-favicon')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const templatePath = path.resolve(__dirname, './index.template.html')
const template = require('fs').readFileSync(templatePath, 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const Port = process.env.PORT || 8080
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})
server.use('/dist', require('express').static(path.resolve(__dirname, './dist')))
server.use('/static', require('express').static(path.resolve(__dirname, './dist/static')))
server.use(favicon(path.join(__dirname, './favicon.ico')))
server.get('*', (req, res) => {
  const context = {
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.url) {
        res.redirect(err.url)
      } else if (err.code === 404) {
        res.status(404).send('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        res.status(500).send('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      }
      return
    }
    res.end(html)
  })
})

server.listen(Port, () => {
  console.log(`server started at localhost:${Port}`)
})
