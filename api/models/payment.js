const mongooose = require('mongoose')

const PaySchema = mongooose.Schema({
    user : {
        type : mongooose.SchemaTypes.ObjectId,ref:"user"
    },
    name : String,
    price : String,
    description : String,
    date : Date
})

module.exports = mongooose.model("payment",PaySchema)