var express = require('express');
var router = express.Router();
var product = require('../models/product');

/* GET products listing. */
router.get('/', function(req, res, next) {
    product.getAllProduct(function (found) {
        console.log(found);
        res.json(found);
    });
});

/* POST new product. */
router.post('/', function(req, res, next) {
    product.addProduct(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/:id', function (req, res, next) {
    product.deleteProduct(req.params.id, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg:'error: ' + err }
        );
    })
});

// another syntax
//router.route('/:id').delete(function (req, res) {
//    var models = require('../models/models');
//    models.Product.remove({_id: req.params.id}, function (err, result) {
//        res.send(
//            (err === null) ? { msg: '' } : { msg:'error: ' + err }
//        );
//    })
//})

/* GET template. */
router.get('/index', function(req, res, next) {
    res.render('pages/products', { title: 'RESTful Web Services API Demonstration' });
});

module.exports = router;
