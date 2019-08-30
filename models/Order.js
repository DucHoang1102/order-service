var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var OrderSchema = new mongoose.Schema({
    id_customer: { type: String },
    products   : [{
        category: { type: String },
        suite   : { type: String },
        embryos : { type: String },
        size    : { type: String },
        state   : { type: Number, min: 0, max: 1, default: 0 },
        type    : { type: String, enum: ['new', 'old'], default: 'new' },
        label   : { type: String }
    }],
    credit     : { },
    note       : { type: String },
    state      : { type: String }  

}, { timestamps: true });

OrderSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Orders', OrderSchema);