import Route from '../classes/Route.js'
import SubscriptionController from '../controllers/SubscriptionController.js'

const ROUTES = [
	new Route('get', '/', (_, response) => {
		response.render('landing', { port: process.env.PORT })
	}),
	new Route('post', '/subscribe', SubscriptionController),
]

export default ROUTES
