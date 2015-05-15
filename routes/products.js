var express = require('express');
var router = express.Router();
var product = require('../models/product');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data;
    product.getAllProduct(function (found) {
        console.log(found);
        res.json(found);
    });
});

/* GET template. */
router.get('/index', function(req, res, next) {
    res.render('pages/products', { title: 'RESTful Web Services API Demonstration' });
});

module.exports = router;
