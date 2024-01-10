const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    organizer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})



const Event = mongoose.model('Event', eventSchema);
module.exports = Event;