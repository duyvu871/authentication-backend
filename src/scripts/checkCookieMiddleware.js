

export function checkCookieMiddleware(req, res, next) {
  if (req.cookies && req.cookies.token) {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
  }
  next()
}