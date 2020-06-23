document.addEventListener("DOMContentLoaded", () => {
	// DOM elements selection
	const hr_value = document.querySelector(".measures__bpm__value");
	const trigger = document.querySelector(".measures__heart");
	const tracklist = document.querySelector(".player__tracklist");

	var sound = new Howl({
		src: ["china-white.mp3"],
		autoplay: true,
		loop: true,
		volume: 0.5,
	});
	console.log(sound);

	const playTrack = (url) => {
		// if (url == sound._src) return;
		Howler.unload();
		// sound._src =
		var sound = new Howl({
			src: [url],
			autoplay: true,
			loop: true,
			volume: 0.5,
		});
		sound.load();
		console.log(sound);
	};
	// playTrack();
	// sound.src.append("astronomia.mp3")
	const Player = function (tempo) {
		this.tempo = tempo;
		this.low_tempo = Math.floor(tempo / 10) * 10;
		this.high_tempo = Math.ceil(tempo / 10) * 10;
		this.tracks = [];

		this.showTracks = () => {
			tracklist.innerHTML = "";
			this.tracks.forEach((track) => {
				tracklist.innerHTML += `<li>${track.track}</li>`;
				
			});
		};
	};

	const switchTracks = async (player, tempo) => {
		// Change interval tempo value if outside scope
		if (tempo < player.low_tempo || tempo > player.high_tempo) {
			console.log("changing the tempo to", tempo);
			player = new Player(tempo);
			playTrack(player.songUrl)
			console.log(player.tracks)
			// console.log(player.low_tempo)
		}

		// Update the player tracks
		player.tracks = json.tracks;
		console.log('player tracks', player.tracks)
		player.showTracks();
		// getTrackSample(player.tracks[0].track);

		// console.log(player.tracks);
	};

	

	const handleHeartbeatChange = (event) => {
		let value = event.target.value;
		var a = [];
		for (var i = 0; i < value.byteLength; i++) {
			a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
		}
		value = parseInt(a.join(" ").slice(-4));
		hr_value.innerHTML = value;
		// switchTracks(player, value);
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

	const player = new Player(67);


});
