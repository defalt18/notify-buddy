import NotificationSender from './NotificationSender.js'
import { MailtrapClient } from 'mailtrap'
import getSecretKey from '../secrets/secrets.js'
import _get from 'lodash/get.js'
import { MailNotificationTemplate } from '../constants/templates.js'

export default class MailNotificationSender extends NotificationSender {
	constructor() {
		super()
		this.provider = MailtrapClient
		this.sender_information = {
			name: 'Notify Buddy',
			email: 'mailtrap@nottify-app.com',
		}
	}

	_getInstance() {
		return this
	}

	async _connect(params) {
		this.recipient_email = _get(params, 'body.recipient_mail')
		this.service = new this.provider({
			token: getSecretKey('MAILTRAP_TOKEN'),
			endpoint: getSecretKey('MAILTRAP_ENDPOINT'),
		})
	}

	_synthesizeBody() {
		return `Hi ${this.recipient_email},\n` + MailNotificationTemplate.body
	}

	async _send(params) {
		await this._connect(params)
		await this.service.send({
			from: this.sender_information,
			to: [{ email: this.recipient_email }],
			subject: MailNotificationTemplate.title,
			category: 'Integration Test',
			text: this._synthesizeBody(),
		})
	}
}
