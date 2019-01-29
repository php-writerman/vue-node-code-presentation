export default ({ ac }) => (req, res, next) => {
  req.ac = ac
  next()
}
