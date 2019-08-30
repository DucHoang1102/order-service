var mongoose = require('mongoose'),
    Order    = mongoose.model('Orders');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Order Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Order.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var orders = results[0]
        return res.json({
            orders: orders
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var order = new Order(req.body.order);

    order.save().then(result => {
        return res.json({
            orders: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.details = function (req, res, next) {
    Order.findById(req.params.id).then(result => {
        if (!result) throw new Error('Order not found');

        return res.json({
            orders: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.update = function (req, res, next) {
    Order.findById(req.params.id).then(result => {
        if (!result) throw new Error('Order not found');

        if (typeof req.body.order.id_customer !== 'undefined') {
            result.id_customer = req.body.order.id_customer;
        }

        if (typeof req.body.order.products !== 'undefined') {
            result.products = req.body.order.products;
        }

        if (typeof req.body.order.credit !== 'undefined') {
            result.credit = req.body.order.credit;
        }

        if (typeof req.body.order.note !== 'undefined') {
            result.note = req.body.order.note;
        }

        if (typeof req.body.order.state !== 'undefined') {
            result.state = req.body.order.state;
        }

        result.save().then(result => {
            return res.json({
                orders: result
            });

        }).catch( err => res.json({ errors: err.message }) )
        

    }).catch( err => res.json({ errors: err.message }) );
};

exports.delete = function (req, res, next) {
    Order.findByIdAndRemove(req.params.id).then(result => {
        if (!result) throw new Error('Order not found');

        return res.json({
            orders: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};
