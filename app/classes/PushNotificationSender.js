import NotificationSender from './NotificationSender.js'
import webpush from 'web-push'
import { PushWebNotificationTemplate } from '../constants/templates.js'
export default class PushNotificationSender extends NotificationSender {
	constructor() {
		super()
		this.pushService = webpush
		this.template = PushWebNotificationTemplate
	}

	_connect() {
		this.pushService.setVapidDetails(
			process.env.WB_MAIL,
			process.env.WB_PUBLIC_KEY,
			process.env.WB_PRIVATE_KEY
		)
	}

	_preparePayload() {
		return JSON.stringify(this.template)
	}

	async _send(request) {
		const { body: subscription } = request
		this._connect()
		const payload = this._preparePayload()
		await this.pushService.sendNotification(subscription, payload)
	}
}
