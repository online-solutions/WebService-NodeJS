/**
 * Created by yohananjr13 on 5/15/15.
 */
var mongoose = require('mongoose');
var host_url = 'mongodb://localhost:27017/webservice'

mongoose.connect(host_url, function(err) {
    if(err) {
        console.log('connection error ----\n', err);
    } else {
        console.log('connection successful to ' + host_url);
    }
});

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
    description: String,
    isActive: Boolean,
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

var User = mongoose.model('users', userSchema);
var Product = mongoose.model('products', productSchema);

module.exports = {
    User: User,
    Product: Product
};