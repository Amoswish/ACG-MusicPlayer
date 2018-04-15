var express = require('express');
var Server = require('../../utils/httpServer');
var router = express.Router()
router.get('/',function(req,res){
    res.send("ssss")
})

module.exports = router;