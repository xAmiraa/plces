var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

var  payment= new Schema({
    card: {
        type: String,
        required: true
      },
    acount_number: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    }
},
{
    collection: "payment"
}
);

mongoose.model("payment",payment);