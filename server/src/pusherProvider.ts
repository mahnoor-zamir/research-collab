import Pusher from "pusher";

export function initPusher() {
	const pusher = new Pusher({
		appId: "1794598",
		key: process.env.PUSHER_KEY,
		secret: process.env.PUSHER_SECRET,
		cluster: "ap2",
		useTLS: true,
	});

	return pusher;
}
