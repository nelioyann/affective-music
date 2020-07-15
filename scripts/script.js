document.addEventListener("DOMContentLoaded", () => {
	// DOM elements selection
	const hr_value = document.querySelector(".measures__bpm__value");
	const trigger = document.querySelector(".measures__heart");
	const tracklist = document.querySelector(".player__tracklist");

	const local_samples = ["../songs/bensound-cute.mp3", "../songs/bensound-elevate.mp3", "../songs/bensound-summer.mp3", "../songs/bensound-ukelele.mp3"];
	var sound = new Howl({
		src: ["../songs/bensound-cute.mp3"],
		autoplay: true,
		loop: true,
		volume: 0.3,
	});
	sound.rate(1.5)
	// console.log(sound);


	

	const handleHeartbeatChange = (event) => {
		let value = event.target.value;
		var a = [];
		for (var i = 0; i < value.byteLength; i++) {
			a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
		}
		let currentBpm = parseInt(a.join(" ").slice(-4));
		hr_value.innerHTML = currentBpm;
	};

	const connect_miband = async () => {
		console.log("Connection initiated");
		try {
			var options = {
				acceptAllDevices: true,
				optionalServices: ["heart_rate"],
			};
			var device = await navigator.bluetooth.requestDevice(options);
			console.log(device);
			var server = await device.gatt.connect();
			console.log(server);
			var service = await server.getPrimaryService("heart_rate");
			console.log(service);
			var characteristic = await service.getCharacteristic(
				"heart_rate_measurement"
			);
			await characteristic.startNotifications();
			console.log("Notif started");
			characteristic.addEventListener(
				"characteristicvaluechanged",
				handleHeartbeatChange
			);
		} catch (e) {
			console.log(e);
		}
	}

	
	trigger.addEventListener("click", connect_miband);

	// Testing



});
