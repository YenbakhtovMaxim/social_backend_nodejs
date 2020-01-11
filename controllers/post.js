const Post = require('../models/post');

exports.getPosts = (req, res) => {
	const post = Post.find()
	.select("_id title body")
	.then(posts => res.json({ posts }))
	.catch(err => console.log(err))
}

exports.createPort = (req, res) => {
	const post = new Post(req.body);
	post.save((err, result) => {
		if(err){
			return res.status(400).json({
				error: err
			})
		}
		return 	res.status(200).json({
			post: result
		})
	});
}
