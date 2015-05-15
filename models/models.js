/**
 * Created by SUCCESS\phungdinh on 5/15/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    token : String,
    email: String,
    hashed_password: String,
    salt : String,
    temp_str:String
});

var productSchema = mongoose.Schema({
    id: Number,
    categoryId: Number,
    name: String,
    price: Number,
    description: String
}, { versionKey: false });

mongoose.connect('mongodb://localhost:27017/webservice');
module.exports.users = mongoose.model('users', userSchema);
module.exports.products = mongoose.model('products', productSchema);
