import express from 'express'
const router = express.Router()
import Post from '../models/Post.js'


//GET BACK ALL THE POSTS
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.status(401).json({message: err})
    }
})

//SPECIFIC POST
router.get('/:postId', async (req,res) =>{
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }catch(err){
        res.json({message:err})
    }
})

//SUBMIT A POST
router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const data = await post.save()
        res.json(data)
    }catch(err){
        res.status(401).json({message: err})
    }
})


//Delete POST
router.delete('/:postId', async (req,res) =>{
    try{
        const deletedPost = await Post.findByIdAndRemove(req.params.postId)
        res.json(deletedPost)
    }catch(err){
        res.json({message:err})
    }
})

//Update a post 
router.patch('/:postId', async (req,res) =>{
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId}, 
            {$set:{title: req.body.title}}
        )
        res.json(updatedPost)
    }catch(err){
        res.status(300).json({message:err})
    }
})

export default router