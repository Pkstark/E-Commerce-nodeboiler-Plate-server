var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PRODUCT_SCHEMA = {};
PRODUCT_SCHEMA.CONTACT = {
    username : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : ''
    },
    mobileno : {
        type : String,
        default : ''
    },
    organization : {
        type : String,
        default : ''
    },
    gender : {
        type : String,
        default : ''
    },
    feedback : {
        type : String,
        default : ''
    },
    contactID : {
        type : String,
        default : ''
    }
    // address : [{
    //     doorno : {
    //         type : String,
    //         default : ''
    //     },
    //     street : {
    //         type : String,
    //         default : ''
    //     },
    //     city : {
    //         type : String,
    //         default : ''
    //     },
    //     state : {
    //         type : String,
    //         default : ''
    //     },
    //     pincode : {
    //         type : String,
    //         default : ''
    //     }
    // }]
};

module.exports = PRODUCT_SCHEMA;