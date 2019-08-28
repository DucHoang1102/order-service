var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var StateSchema = new mongoose.Schema({
}, {timestamps: true});

StateSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('States', StateSchema);