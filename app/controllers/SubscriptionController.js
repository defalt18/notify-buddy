import PushNotificationSender from '../classes/PushNotificationSender.js'
import MailNotificationSender from '../classes/MailNotificationSender.js'
import _has from 'lodash/has.js'
import _isNull from 'lodash/isNull.js'
import logger from '../utils/logger.js'
import SMSNotificationSender from '../classes/SMSNotificationSender.js'

const SENDER_MAP = {
	mail: MailNotificationSender,
	sms: SMSNotificationSender,
}
function configureSendService(request) {
	const Service = SENDER_MAP[_has(request, 'query.mail') ? 'mail' : 'sms']
	return _isNull(Service) ? PushNotificationSender : Service
}
export default async function SubscriptionController(request, response) {
	const Service = configureSendService(request)
	const service = new Service()
	try {
		await service._send(request)
	} catch (err) {
		logger.log('error', err.toString())
		return response.status(500).send({ error: 'Service not available' })
	}
	return response.status(200).send({ info: 'Notification sent!' })
}
