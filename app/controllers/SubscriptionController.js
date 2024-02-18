import PushNotificationSender from '../classes/PushNotificationSender.js'
import MailNotificationSender from '../classes/MailNotificationSender.js'
import _get from 'lodash/get.js'

function configureSendService(request) {
	const isMail = _get(request, 'query.mail')
	return isMail ? MailNotificationSender : PushNotificationSender
}
export default async function SubscriptionController(request, response) {
	const Service = configureSendService(request)
	const sender = new Service()
	await sender._send(request)
	response.send('Notification sent!').status(200)
}
