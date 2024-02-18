export default function getSecretKey(key) {
	return process.env[key]
}
