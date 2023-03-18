export default function(req, res, next) {

  const trailingSlashes = (!req.url.endsWith('/') && req.url.startsWith('_content')) ? {
    from: req.url,
    to: `${req.url}/`
  } : {}

  const redirects = [trailingSlashes]
  const redirect = redirects.find((r) => r.from === req.url)
  
  if (redirect) {
    res.writeHead(301, { Location: redirect.to })
    res.end()
  } else {
    next()
  }
}