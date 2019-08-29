var mongoose = require('mongoose'),
    State = mongoose.model('States');

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = State.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var states = results[0]
        return res.json({
            states: states
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var state = new State(req.body.state);

    state.save().then(result => {
        return res.json({
            states: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.details = function (req, res, next) {
    State.findById(req.params.id).then(result => {
        if (!result) throw new Error('State not found');

        return res.json({
            states: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.update = function (req, res, next) {
    State.findById(req.params.id).then(result => {
        if (!result) throw new Error('State not found');

        if (typeof req.body.state.id !== 'undefined') {
            result.id = req.body.state.id;
        }

        if (typeof req.body.state.name !== 'undefined') {
            result.name = req.body.state.name;
        }

        if (typeof req.body.state.description !== 'undefined') {
            result.description = req.body.state.description;
        }

        if (typeof req.body.state.next !== 'undefined') {
            result.next = req.body.state.next;
        }

        result.save().then(result => {
            return res.json({
                states: result
            });

        }).catch( err => res.json({ errors: err.message }) )

    }).catch( err => res.json({ errors: err.message }) );
};

exports.delete = function (req, res, next) {
    State.findByIdAndRemove(req.params.id).then(result => {
        if (!result) throw new Error('State not found');

        return res.json({
            states: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};
