const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    productName: {
        type: String,
        unique:true
        },
        category: {
        type: String
        },
        date: {
        type: String
        },
        freshness: {
        type: String
        },
        price: {
            type: Number
            },          
            comment: {
                type: String
                }   
    
});

module.exports = mongoose.model('MaterialProduct', materialSchema);


