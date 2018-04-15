import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("aaa")
})
router.get('/next', function(req, res, next) {
  res.send("aaa")
  console.log("sss")
})
export default router