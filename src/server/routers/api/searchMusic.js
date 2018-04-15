const express = require('express');
const Server = require('../../utils/httpServer');
var router = express.Router()
router.get('/',function(req,res){
    res.send("ssss")
})

module.exports = router;