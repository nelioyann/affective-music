document.addEventListener("DOMContentLoaded", () => {

	const hr_value = document.querySelector(".measures__bpm__value");


	const getSongs = async (bpm) => {
    // let API_KEY = "2d1f0b47e83725b74f4334664ffedabd";
    let API_KEY = "16f6d8f2b86798778aaf93c3eee3236c"
		const params = new URLSearchParams({
      api_key: API_KEY,
		  bpm: bpm,
    });

    // FETCH

    let uri = `https://api.getsongbpm.com/tempo/?${params.toString()}`
    let headers = new Headers();
    headers.append("Content-Type", "application/json")
    let request = new Request(uri, {
      method: "GET",
      headers: headers,
      mode: "cors"
    })

    // alert('will it work')
		// const url = `https://api.getsongbpm.com/tempo/?${params.toString()}`;
		let response = await fetch(request);
    // let json = await response.json();
    // alert("it worked")
		console.log(response);
	}
  
	getSongs(50)
  const handleChange = (event) => {
    let value = event.target.value;
    var a = [];
    for (var i = 0; i < value.byteLength; i++) {
      a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }
    value = a.join(" ").slice(-4);
    hr_value.innerHTML = `${parseInt(value)}`;
    

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
