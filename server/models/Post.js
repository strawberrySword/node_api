import mongoose from 'mongoose'
const {model} = mongoose

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    date: {
        type: Date,
        defualt:Date.now
    }
})

// module.exports = mongoose.model('Posts', PostSchema)
export default model('Posts', PostSchema)