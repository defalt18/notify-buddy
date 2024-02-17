async function registerServiceWorker() {
	// if ('serviceWorker' in navigator) {
	// 	const register = await navigator.serviceWorker.register('worker.js', {
	// 		scope: '/app/client/',
	// 	})
	// }

	const subscription = await (
		await navigator.serviceWorker.ready
	).pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey:
			'BOM3fzBzPyBqgTzYHhgOoNlVOOs5VIXZXY7pJRgSKvtJ0Z0Ragvzdj3E1nBAxcuYOl0rdr9qmidoinJMpqhOa2g',
	})

	await fetch('http://localhost:8000/subscribe', {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

registerServiceWorker().then((err) => console.log(err))
