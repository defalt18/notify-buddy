import PushNotificationSender from '../classes/PushNotificationSender.js'
import logger from '../utils/logger.js'

export default async function SubscriptionController(req, res) {
	logger.log('info', 'reached here....')
	const sender = new PushNotificationSender()
	await sender._send()
	res.status(201)
}
