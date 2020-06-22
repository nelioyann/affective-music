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
		this.uri = `https://api.happi.dev/v1/music/bpm/playlist/${this.low_tempo}-${this.high_tempo}?&limit=1`;
		this.headers = new Headers();
		this.headers.append("Content-Type", "application/json");
		this.headers.append(
			"x-happi-key",
			"ce09b1u4DAwQ5uVNVAYH1jA76cYIQBEHiIPgZuXtP7mDqHbNB8mC5q7B"
		);
		this.request = new Request(this.uri, {
			method: "GET",
			headers: this.headers,
			mode: "cors",
		});

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
		// Fetch the data
		// console.log(player.low_tempo);
		// console.log(player.high_tempo);
		// console.log(player.uri);
		let response = await fetch(player.request);
		let json = await response.json();
		// Update the player tracks
		player.tracks = json.tracks;
		console.log('player tracks', player.tracks)
		player.showTracks();
			getTrackSample(player.tracks[0].track);

		// console.log(player.tracks);
	};

	const getTrackSample = (trackNames) => {
		// fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", {
		// method: "GET"
		console.log("Getting dem tracks");
		trackNames.forEach(async (trackName) => {
			let encodedName = encodeURI(trackName);
			console.log(trackName, encodedName);
			let trackUri = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodedName}`;
			// console.log(trackUri);
			let headers = {
				"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
				"x-rapidapi-key": "50816b0fbdmsh68dbf1c6445f69ap1ba934jsndbabd5bcae15",
			};
			let request = new Request(trackUri, {
				method: "GET",
				headers,
				mode: "cors",
			});
			let response = await fetch(request);
			let json = await response.json();
			let total = json.total;
			if (!total) return;

			player.songUrl = json.data[0].preview;
			
			// console.log(songUrl);

			// console.log(json);
		});
	};

	const handleHeartbeatChange = (event) => {
		let value = event.target.value;
		var a = [];
		for (var i = 0; i < value.byteLength; i++) {
			a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
		}
		value = parseInt(a.join(" ").slice(-4));
		hr_value.innerHTML = value;
		switchTracks(player, value);
	};

	trigger.addEventListener("click", async () => {
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
	});

	// Testing

	const player = new Player(67);

	// switchTracks(player, 68)
	// // switchTracks(player, 70)
	// console.log("Post switch")
	// const test = () =>{
	// 	// console.log(test)
	// 	switchTracks(player, 52)
	// }
	// setTimeout(test, 3000)
	// setTimeout(switchTracks(player, 62), 10000)
});
