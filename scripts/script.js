document.addEventListener("DOMContentLoaded", async () => {
	// DOM elements selection
	const hr_value = document.querySelector(".measures__bpm__value");
	const trigger = document.querySelector(".measures__heart");
	const tracklist = document.querySelector(".player__tracklist");

	const Player = function (tempo) {
		this.tempo = tempo;
		this.low_tempo = Math.floor(tempo / 10) * 10;
		this.high_tempo = Math.ceil(tempo / 10) * 10;
		this.tracks = []
		this.uri = `https://api.happi.dev/v1/music/bpm/playlist/${this.low_tempo}-${this.high_tempo}?&limit=3`;
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

		this.showTracks = () =>{
			tracklist.innerHTML = ""
			this.tracks.forEach(track =>{
				tracklist.innerHTML += `<li>${track.track}</li>`
			})
		}
	};

	

	const switchTracks = async (player, tempo) =>{
		// Change interval tempo value if outside scope
		if (tempo < player.low_tempo || tempo > player.high_tempo){
			console.log("changing the tempo to", tempo)
			player = new Player(tempo)
			// console.log(player.low_tempo)
		}
		// Fetch the data
		console.log(player.low_tempo);
		console.log(player.high_tempo);
		console.log(player.uri);
		let response = await fetch(player.request);
		let json = await response.json();
		// Update the player tracks
		player.tracks = json.tracks;
		player.showTracks()
		console.log(player.tracks);
	}

	const handleHeartbeatChange = (event) => {
		let value = event.target.value;
		var a = [];
		for (var i = 0; i < value.byteLength; i++) {
			a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
		}
		hr_value.innerHTML = `${parseInt(value)}`;
		value = a.join(" ").slice(-4);
		switchTracks(player, value)
	};

	trigger.addEventListener("click", async () => {
		try {
			let options = {
				acceptAllDevices: true,
				optionalServices: ["heart_rate"],
			};
			const device = await navigator.bluetooth.requestDevice(options);
			const server = await device.gatt.connect();
			const service = await server.getPrimaryService("heart_rate");
			const characteristic = await service.getCharacteristic(
				"heart_rate_measurement"
			);
			await characteristic.startNotifications();
			characteristic.addEventListener(
				"characteristicvaluechanged",
				handleHeartbeatChange
			);
		} catch (e) {
			alert(e);
		}
	});


	// Testing
	
	const player = new Player(55);
	
	

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
