var express = require('express');
var app = express();
var Server = require('../../utils/httpServer');
var router = express.Router()
var recommandList = require('./recommandList')
var searchMusic = require('./searchMusic')
router.use('/recommandList',recommandList );
router.use('/searchMusic',searchMusic)
module.exports = router;