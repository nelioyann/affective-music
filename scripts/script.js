const feedback = (message) => {
	let feedback = document.querySelector(".feedbackMessage");
	feedback.innerHTML += `<p>${message}</p>`;
};
// let uuid = "00002a37-0000-1000-8000-00805f9b34fb";
const handleChange = (event) => {
	let value = event.target.value;
	let a = [];
	for (let i = 0; i < value.byteLength; i++) {
		a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
	}
	log("> " + a.join(" "));
};
let uuid = "00000009-0000-3512-2118-0009af100700";
let options = { acceptAllDevices: true, optionalServices: ["heart_rate"] };
const trigger = document.querySelector(".main_btn");
trigger.addEventListener("click", async () => {
	try {
		let device = await navigator.bluetooth.requestDevice(options);
		feedback(device.name);

		let server = await device.gatt.connect();
		console.log(server);
		feedback("Server connected");
		let service = await device.gatt.getPrimaryService("heart_rate");
		console.log(service);
		feedback("Service connected");

		let characteristic = await service.getCharacteristic(0x2a37);
		console.log(characteristic);
		feedback("characteristic retrieved");

		let auth = await characteristic.startNotifications();
		console.log("Notifications have been started.");
		// characteristic.addEventListener("characteristicvaluechanged", handleChange);
		// let value = await characteristic.readValue()
		// console.log(value.getInt8(0))
	} catch (e) {
		feedback(e);
	}
});
