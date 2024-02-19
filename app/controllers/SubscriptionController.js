import PushNotificationSender from '../classes/PushNotificationSender.js'
import MailNotificationSender from '../classes/MailNotificationSender.js'
import SMSNotificationSender from '../classes/SMSNotificationSender.js'
import _keys from 'lodash/keys.js'
import _head from 'lodash/head.js'
import executeAsyncSafeStatement from '../utils/handlers.js'

const SENDER_SERVICE_MAP = {
	mail: MailNotificationSender,
	sms: SMSNotificationSender,
	push: PushNotificationSender,
}
function getSendService(request) {
	const requestedServiceType = _head(_keys(request.query))
	return new SENDER_SERVICE_MAP[requestedServiceType]()
}
export default async function SubscriptionController(request, response) {
	const service = getSendService(request)._getInstance()
	const { meta } = await executeAsyncSafeStatement(service, request)
	return response.status(meta.status).send(meta)
}
