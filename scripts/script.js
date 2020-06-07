const feedback = (message) => {
	var feedback = document.querySelector(".feedbackMessage");
	feedback.innerHTML += `<li>${message}</li>`;
};
// var uuid = "00002a37-0000-1000-8000-00805f9b34fb";

const handleChange = (event) => {
	let value = event.target.value;
    // feedback(value)
	var a = [];
	for (var i = 0; i < value.byteLength; i++) {
		a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
	}
    value = (a.join(" ")).slice(-4)
	// feedback(typeof value);
    document.querySelector(".heart").style.animationDuration = `${1300 - parseInt(value) *10}ms`
    document.querySelector(".hr").innerHTML = `${parseInt(value) }bpm `
    document.querySelector("audio").playbackRate = `${parseInt(value) / 10}`
    feedback(`Play rate speed${parseInt(value) / 10}`)
};
// var uuid = "00000009-0000-3512-2118-0009af100700";
var options = { acceptAllDevices: true, optionalServices: ["heart_rate"] };
const trigger = document.querySelector(".connect");
trigger.addEventListener("click", async () => {
	try {
        
        document.querySelector("audio").play()
		var device = await navigator.bluetooth.requestDevice(options);
		feedback(`Connection established to the device`);

		var server = await device.gatt.connect();
		console.log(server);
		feedback("Server connected");
		var service = await server.getPrimaryService("heart_rate");
		console.log(service);
		feedback("Heart Rate service connected");

		var characteristic = await service.getCharacteristic("heart_rate_measurement");
		console.log(characteristic);
		feedback("Characteristic retrieved");
		await characteristic.startNotifications();
		console.log("Notifications have been started.");
        feedback("Notifications have been started.")
		characteristic.addEventListener("characteristicvaluechanged", handleChange);
	} catch (e) {
        feedback(e)
		console.log(e);
	}
});
