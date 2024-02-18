import NotificationSender from './NotificationSender.js'
import webpush from 'web-push'
import { PushWebNotificationTemplate } from '../constants/templates.js'
import getSecretKey from '../secrets/secrets.js'
export default class PushNotificationSender extends NotificationSender {
	constructor() {
		super()
		this.pushService = webpush
		this.template = PushWebNotificationTemplate
	}

	_connect() {
		this.pushService.setVapidDetails(
			getSecretKey('WB_MAIL'),
			getSecretKey('WB_PUBLIC_KEY'),
			getSecretKey('WB_PRIVATE_KEY')
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
