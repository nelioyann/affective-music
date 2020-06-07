const feedback = (message) => {
	var feedback = document.querySelector(".feedbackMessage");
	feedback.innerHTML += `<li>${message}</li>`;
};
// var uuid = "00002a37-0000-1000-8000-00805f9b34fb";
const handleChange = (event) => {
	var value = event.target.value;
	var a = [];
	for (var i = 0; i < value.byteLength; i++) {
		a.push((value.getUint8(i).toString(16)).slice(-2));
	}
	feedback((a.join(" ")));
};
// var uuid = "00000009-0000-3512-2118-0009af100700";
var options = { acceptAllDevices: true, optionalServices: ["heart_rate"] };
const trigger = document.querySelector(".main_btn");
trigger.addEventListener("click", async () => {
	try {
		var device = await navigator.bluetooth.requestDevice(options);
		feedback("Connected to ",device.name);

		var server = await device.gatt.connect();
		console.log(server);
		feedback("Server connected");
		var service = await server.getPrimaryService("heart_rate");
		console.log(service);
		feedback("Service connected");

		var characteristic = await service.getCharacteristic("heart_rate_measurement");
		console.log(characteristic);
		feedback("characteristic retrieved");
		await characteristic.startNotifications();
		console.log("Notifications have been started.");
        feedback("Notif activé")
        // var descriptors = await characteristic.getDescriptors()
        // console.log(descriptors)
		// feedback("descriptors retrieved");
		characteristic.addEventListener("characteristicvaluechanged", handleChange);
		// var value = await characteristic.readValue()
		// console.log(value.getInt8(0))
	} catch (e) {
        feedback(e)
		console.log(e);
	}
});
