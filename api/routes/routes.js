module.exports = (app) => {

	const userControllerMethods = require('../controllers/userControllers');
	const postControllerMethods = require('../controllers/postControllers');

	// console.log(userControllerMethods)

	// app.route('/')
	// 	.get(userControllerMethods.indexPage);

	// app.route('/create-user')
	// 	.get(userControllerMethods.createUser)

	app.route('/new-user')
		.post(userControllerMethods.createUser);

	app.route('/posts')
		.get(postControllerMethods.getPosts);

	app.route('/posts/:id')
		.get(postControllerMethods.getPost)
		.put(postControllerMethods.addComment);

	app.route('/new-post')
		.post(postControllerMethods.createPost);

	app.route('/login')
		.get(userControllerMethods.login);
};
