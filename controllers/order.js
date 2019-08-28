var mongoose = require('mongoose'),
    Order    = mongoose.model('Orders');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Order Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
};

exports.new = function (req, res, next) {
};

exports.details = function (req, res, next) {
};

exports.update = function (req, res, next) {
};

exports.delete = function (req, res, next) {
};
