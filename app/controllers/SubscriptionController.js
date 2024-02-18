import PushNotificationSender from '../classes/PushNotificationSender.js'

export default async function SubscriptionController(request, response) {
	const sender = new PushNotificationSender()
	await sender._send(request)
	response.status(201)
}
