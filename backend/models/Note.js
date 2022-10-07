const mongoose = require('mongoose');
// const {Schema} = mongoose; // harry bhai write this cause he got error schema not defined I did not get that error so commented in case I need it
const NotesSchema = new mongoose.Schema({
    user:{
        //this is user id we imported from user model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: 'general'
    },
    date:{
        type: Date,
        default: Date.now
    },
    
})

module.exports = mongoose.model('notes', NotesSchema);