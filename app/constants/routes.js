import Route from '../classes/Route.js'
import SubscriptionController from '../controllers/SubscriptionController.js'

const METHODS = { GET: 'get', POST: 'post' }

const ROUTES = [
	new Route(METHODS.GET, '/', (_, response) => {
		response.render('landing', { port: process.env.PORT })
	}),
	new Route(METHODS.POST, '/subscribe', SubscriptionController),
	new Route(METHODS.GET, '/manage-notifications', (_, response) => {
		response.render('manage-notifications', {
			PUBLIC_KEY: process.env.WB_PUBLIC_KEY,
		})
	}),
]

export default ROUTES
