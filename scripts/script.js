// const { max } = require("lodash");

document.addEventListener("DOMContentLoaded", () => {
  const elPairingTrigger = document.querySelector(".connect-band");
  const elMessage = document.querySelector(".message");

  const heartRateValues = [];
  const maxLenght = 20;
  document.querySelector(".heart-rates h3").innerText += ` ${maxLenght}`


  const handleHeartbeatChange = (event) => {
    let value = event.target.value;
    var a = [];
    for (var i = 0; i < value.byteLength; i++) {
      a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }
    let currentBpm = parseInt(a.join(" ").slice(-4));

    // As long as the lenght isn't reached add values
    if (heartRateValues.length < maxLenght){
      document.querySelector(".heart-rates .grid").innerHTML += `<button>${currentBpm}</button>`;
      heartRateValues.push(currentBpm)
    }
    // elMessage.innerText = currentBpm;


    // hr_value.innerHTML = currentBpm;
    // let speed = 0.5 + currentBpm / 100;
    // document.querySelector(
    //   ".speed"
    // ).innerHTML = `Current speed: ${speed.toFixed(2)}`;
    // sound.rate(speed.toFixed(2));
  };
  // console.clear();
  const connect_miband = async () => {
    try {
      const options = {
        filters: [{ namePrefix: "Mi Smart Band" }],
        optionalServices: ["heart_rate"]
      };

      // Connect device
      const device = await navigator.bluetooth.requestDevice(options);
      const server = await device.gatt.connect();

      // Get Herat Rate data
      const service = await server.getPrimaryService("heart_rate");
      const characteristic = await service.getCharacteristic("heart_rate_measurement");

      // Listen to changes on the device
      await characteristic.startNotifications();
      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleHeartbeatChange
      );
    } catch (e) {
      console.log(e);
    }
  };
  elPairingTrigger.addEventListener("click", connect_miband);

  // document.querySelector(".trigger")?.addEventListener("click", connect_miband);

  // Checks if BLE pairing is supported
  const checkBLE = async () => {
    try {
      const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
      elMessage.innerText = `> Bluetooth is ${
        isBluetoothAvailable ? "available" : "unavailable"
      }`;
    } catch (error) {
      console.log("Argh! " + error);
    }
  };

  if ("onavailabilitychanged" in navigator.bluetooth) {
    navigator.bluetooth.addEventListener(
      "availabilitychanged",
      function (event) {
        elMessage.innerText = `> Bluetooth is ${
          event.value ? "available" : "unavailable"
        }`;
      }
    );
  }

  checkBLE();
});
