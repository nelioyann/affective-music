document.addEventListener("DOMContentLoaded", () => {

	const hr_value = document.querySelector(".measures__bpm__value");

  const getToken = async () =>{
    let username = "";
    let password = ""
    let token__uri = `https://www.bpmdatabase.com/api/auth/token/`
    let verify_uri = "https://www.bpmdatabase.com/api/auth/token/verify/"
    let headers = new Headers();
    headers.append("Content-Type", "application/json")
    let body = {username, password}
    let request = new Request(token__uri, {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify(body)
    })
    let response = await fetch(request);
    let json = await response.json();
    console.log(json)
    let token = json.token
    // console.log(token)
    //   let vresponse = await fetch(verify_uri, {
    //     method: "POST",
    //     headers: headers,
    //     body: JSON.stringify({token, password, username})
    //   })
    //   let vjson = await vresponse.json()
    //   console.log(vjson)

    // getSongs(45, token)
  }

    // getToken()
	const getSongs = async (bpm, token) => {
	

    // FETCH
    let bpm__uri = `https://www.bpmdatabase.com/api/tracks/?bpm=${bpm}`
    let headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("X-CSRFToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
    

    let request = new Request(bpm__uri, {
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
  
	// getSongs(50)
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
      alert(e)
      // console.log(e);
    }
  });
});
