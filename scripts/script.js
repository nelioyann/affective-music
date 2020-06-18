document.addEventListener("DOMContentLoaded", () => {

	const hr_value = document.querySelector(".measures__bpm__value");



  // var uuid = "00002a37-0000-1000-8000-00805f9b34fb";

  const handleChange = (event) => {
    // document.querySelector("audio").play();

    let value = event.target.value;
    var a = [];
    for (var i = 0; i < value.byteLength; i++) {
      a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }
    value = a.join(" ").slice(-4);
    // feedback(typeof value);
    // document.querySelector(".heart").style.animationDuration = `${1300 - parseInt(value) *10}ms`
    hr_value.innerHTML = `${parseInt(value)}bpm `;
    // let playbackspeed = parseInt(value) / 100 + 0.2;
    // playbackspeed = playbackspeed.toFixed(1);
    // document.querySelector("audio").playbackRate = playbackspeed;
    // feedback(`Play rate speed: ${playbackspeed}`);
  };
  // var uuid = "00000009-0000-3512-2118-0009af100700";
  var options = { acceptAllDevices: true, optionalServices: ["heart_rate"] };
  const trigger = document.querySelector(".measures__heart");
  trigger.addEventListener("click", async () => {
    try {
      var device = await navigator.bluetooth.requestDevice(options);
      var server = await device.gatt.connect();
      var service = await server.getPrimaryService("heart_rate");
      var characteristic = await service.getCharacteristic(
        "heart_rate_measurement"
      );
    //   console.log(characteristic);
    //   feedback("Characteristic retrieved");
      await characteristic.startNotifications();
      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleChange
      );
    } catch (e) {
      feedback(e);
      console.log(e);
    }
  });
});
