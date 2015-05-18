/**
 * Created by SUCCESS\phungdinh on 5/15/15.
 */
var models = require('../models/models');

exports.getProductsByCategoryId = function (categoryId, callback) {
    models.Product.find({categoryId: categoryId}, function (err, products) {
        if (err){
            console.log(err);
            console.log("query error");
        }
        callback(products);
    });
};

exports.getAllProduct = function (callback) {
    models.Product.find(function (err, products) {
        callback(products);
    });
};

exports.addProduct = function (productObject, callback) {
    //var product = new models.Product(productObject);
    models.Product.create(productObject, function (err, result) {
        callback(err, result);
    });

    // more info
    //http://stackoverflow.com/questions/19701154/mongoose-whats-the-differences-between-model-create-and-collection-insert
    //callback();
};

exports.updateProduct = function (productId, productObject, callback) {
    // TODO: magic, don't touch
    models.Product.update({_id: productId}, productObject, {upsert: true}, function (err, products) {
        callback(err, products);
    });

}

exports.deleteProduct = function (productId, callback) {
    models.Product.find({_id: productId}).remove(function (err, result) {
        callback(err, result);
    });
}

exports.insertSampleProduct = function(){
    var docs = [
        {
            "id": 5,
            "categoryId": 4,
            "name": "product 5",
            "price": 1200,
            "description": "some description here"
        },
        {
            "id": 6,
            "categoryId": 4,
            "name": "[object Object]",
            "price": 1231,
            "description": "this is product 6"
        },
        {
            "id": 6,
            "categoryId": 4,
            "name": "[object Object]",
            "price": 1231,
            "description": "this is product 6"
        },
        {
            "id": 6,
            "categoryId": 4,
            "name": "[object Object]",
            "price": 1231,
            "description": "this is product 6"
        },
        {
            "id": 6,
            "categoryId": 4,
            "name": "[object Object]",
            "price": 1231,
            "description": "this is product 6"
        }
    ];
    models.Product.collection.insert(docs, onInsert);

    function onInsert(err, docs) {
        if (err) {
            // TODO: handle error
        } else {
            console.info('%d product(s) were successfully stored.', docs.result.n);
        }
    }
};