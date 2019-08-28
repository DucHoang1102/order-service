var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var OrderSchema = new mongoose.Schema({
}, {timestamps: true});

OrderSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Orders', OrderSchema);