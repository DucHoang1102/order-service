var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var StateSchema = new mongoose.Schema({
    id         : { type: String, upperCase: true, trim: true, required: true, unique: true },
    name       : { type: String },
    description: { type: String },
    next       : { type: String }

}, {timestamps: true});

StateSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('States', StateSchema);