document.addEventListener("DOMContentLoaded", () => {
  // DOM elements selection
  const hr_value = document.querySelector(".measures__bpm__value");
  const trigger = document.querySelector(".measures__heart");
  const tracklist = document.querySelector(".player__tracklist");
  const samples = tracklist.querySelectorAll(".player__tracklist__sample");
  const heart__image = document.querySelector(
    ".measures__heart__image_beating"
  );
  const mute = document.querySelector(".player__controls__button__mute");
  let volume = 0.3;
  const handleMute = (event) => {
    mute.classList.toggle("player__controls__button__mute-muted");
    if (
     mute.classList.contains("player__controls__button__mute-muted")
    ) {
      Howler.mute(true);
    } else {
      Howler.mute(false);
    }
  };
  mute.addEventListener("click", handleMute);
  const local_samples = [
    "../songs/bensound-summer.mp3",
    "../songs/bensound-elevate.mp3",
    "../songs/bensound-cute.mp3",
    "../songs/bensound-ukelele.mp3",
  ];
  var sound = new Howl({
    src: local_samples,
  });
  const playSample = (sampleTitle) => {
    sound.unload();
    sound = new Howl({
      src: sampleTitle,
      autoplay: false,
      loop: true,
      volume,
    });
    sound.rate(1);
    sound.play();
  };
  // console.log(sound);

  // const test = () => {
  // sound.on('fade', sound.fade(0, volume, 3000))
  // sound.fade(volume, 0, 3000);
  // sound.rate(1.04)
  // sound.fade(0, volume, 3000)
  // };
  // setTimeout(test, 9000)

  const handleMusicChanges = (event) => {
    samples.forEach((sample) =>
      sample.classList.remove("player__tracklist__sample-active")
    );
    event.target.classList.add("player__tracklist__sample-active");
    let title = `../songs/${event.target.getAttribute("data-src")}`;
    mute.classList.remove("player__controls__button__mute-muted");

    Howler.mute(false);
    playSample(title);
  };
  samples.forEach((sample) => {
    sample.addEventListener("click", handleMusicChanges);
  });
  const handleHeartbeatChange = (event) => {
    let value = event.target.value;
    var a = [];
    for (var i = 0; i < value.byteLength; i++) {
      a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }
    let currentBpm = parseInt(a.join(" ").slice(-4));
    hr_value.innerHTML = currentBpm;
    let speed = 0.5 + currentBpm / 100;
    document.querySelector(
      ".speed"
    ).innerHTML = `Current speed: ${speed.toFixed(2)}`;
    sound.rate(speed.toFixed(2));
  };

  const connect_miband = async () => {
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
      sound.play();
      heart__image.style.animationPlayState = "running";
      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleHeartbeatChange
      );
    } catch (e) {
      console.log(e);
    }
  };

  trigger.addEventListener("click", connect_miband);

  // Testing
});
