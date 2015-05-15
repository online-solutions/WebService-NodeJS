var express = require('express');
var router = express.Router();
var product = require('../models/product');
var model = require('../models/models');


/* GET products listing. */
router.get('/', function(req, res, next) {
    product.getAllProduct(function (found) {
        console.log(found);
        res.json(found);
    });
});

/* POST new product. */
router.post('/', function(req, res, next) {
    var p = new model.products(req.body);

    product.addProduct(p, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/* GET template. */
router.get('/index', function(req, res, next) {
    res.render('pages/products', { title: 'RESTful Web Services API Demonstration' });
});

module.exports = router;
