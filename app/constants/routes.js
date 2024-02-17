import Route from '../classes/Route.js'

const ROUTES = [
	new Route('get', '/', (req, res) => {
		res.render('landing', { port: process.env.PORT })
	}),
	new Route('post', '/subscribe', (req, res) => {
		console.log(req, res)
	}),
]

export default ROUTES
