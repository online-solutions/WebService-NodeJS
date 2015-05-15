/**
 * Created by SUCCESS\phungdinh on 5/15/15.
 */
var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var models = require('../models/models');

exports.getProductsByCategoryId = function (categoryId, callback) {
    models.products.find({categoryId: categoryId}, function (err, products) {
        if (err){
            console.log(err);
            console.log("query error");
        }
        callback(products);
    });
};

exports.getAllProduct = function (callback) {
    models.products.find(function (err, products) {
        callback(products);
    });
};

exports.addProduct = function (product, callback) {
    models.products.create(product, function (err, result) {
        callback(err, result);
    });

    // more info
    //http://stackoverflow.com/questions/19701154/mongoose-whats-the-differences-between-model-create-and-collection-insert
    //callback();
};

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
    models.products.collection.insert(docs, onInsert);

    function onInsert(err, docs) {
        if (err) {
            // TODO: handle error
        } else {
            console.info('%d product(s) were successfully stored.', docs.result.n);
        }
    }
};