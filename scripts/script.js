document.addEventListener("DOMContentLoaded", () => {

	const hr_value = document.querySelector(".measures__bpm__value");


	const getSongs = async (bpm) => {
		const params = new URLSearchParams({
			origin: "*",
		  api_key: "2d1f0b47e83725b74f4334664ffedabd",
		  bpm: bpm,

    });
    alert('will it work')
		const url = `https://api.getsongbpm.com/tempo/?${params.toString()}`;
		let response = await fetch(url);
    let json = await response.json();
    alert("it worked")
		console.log(json);
	}
  
	
  const handleChange = (event) => {
    let value = event.target.value;
    var a = [];
    for (var i = 0; i < value.byteLength; i++) {
      a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }
    value = a.join(" ").slice(-4);
    hr_value.innerHTML = `${parseInt(value)}`;
    getSongs(50)

  };
  // var uuid = "00000009-0000-3512-2118-0009af100700";
  var options = { acceptAllDevices: true, optionalServices: ["heart_rate"] };
  const trigger = document.querySelector(".measures__heart");
  trigger.addEventListener("click", async () => {
    try {
      var device = await navigator.bluetooth.requestDevice(options);
      var server = await device.gatt.connect();
      var service = await server.getPrimaryService("heart_rate");
      var characteristic = await service.getCharacteristic("heart_rate_measurement");
      await characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged",handleChange);
    } catch (e) {
      console.log(e);
    }
  });
});
