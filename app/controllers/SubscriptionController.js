import PushNotificationSender from '../classes/PushNotificationSender.js'
import MailNotificationSender from '../classes/MailNotificationSender.js'
import _get from 'lodash/get.js'
import logger from '../utils/logger.js'

function configureSendService(request) {
	const isMail = _get(request, 'query.mail')
	return isMail ? MailNotificationSender : PushNotificationSender
}
export default async function SubscriptionController(request, response) {
	const Service = configureSendService(request)
	const sender = new Service()
	try {
		await sender._send(request)
	} catch (err) {
		logger.log('error', err.toString())
		response.send('Service not available').status(500)
	}
	response.send('Notification sent!').status(200)
}
