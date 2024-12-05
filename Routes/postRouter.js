const Router = require('express') // импортируют модуль express 
const router = new Router() // 
const PostController = require('../Controllers/PostController') // 

router.post('/post', PostController.createPost)
router.get('post/:id', PostController.getPostByUser)

module.exports = router;