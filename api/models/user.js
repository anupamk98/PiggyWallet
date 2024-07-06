const mongooose = require('mongoose')

const UserSchema = mongooose.Schema({
    name : String,
    username : String,
    password : String,
    posts :[
        {
            type : mongooose.SchemaTypes.ObjectId,
            ref : "payment"
        }
    ]
})

module.exports = mongooose.model("user",UserSchema)