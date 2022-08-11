var Posts = require('./posts.controller');
var postSchema = require('./posts.model');
module.exports = function(router) {
    router.post('/create', Posts.createPost);
    router.get('/get', Posts.getPost);
    router.get('/get/:name', Posts.getPost);
    router.put('/update/:id', Posts.updatePost);
    router.delete('/remove/:id', Posts.removePost);

    router.get('/updatepost', (req, res) => {
        res.render('updatepost');
       });
}