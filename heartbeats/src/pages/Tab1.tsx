import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";

// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { bluetooth } from "ionicons/icons";



const Tab1: React.FC = () => {

 
  // let mobileNavigatorObject: any = window.navigator;

  const [bleAvailability, setbleAvailability] = useState(false);
  // const [hrValue, setHrValue] = useState(0);

  
  // Checks if BLE pairing is supported
  (async () => {
    try {
      const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
      console.log("check ble a ");
      setbleAvailability(isBluetoothAvailable);
    } catch (error) {
      console.log("Argh! " + error);
    }
  })();

  const handleHeartbeatChange = (event: Event) => {
    // console.log(event)
    // let {target} = event;
    // As input element otherwise the value can't be retrieved
    let target = event.target as HTMLInputElement;
    let value = target.value as unknown as DataView;
    // console.log(value)

    // let value = target?.value;
    // console.log(value)
    // if(target && target.value)
    var a = [];
    for (var i = 0; i < value?.byteLength; i++) {
      a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }
    let currentBpm = parseInt(a.join(" ").slice(-4));
    console.log(currentBpm)
    // setHrValue(currentBpm)

    // As long as the lenght isn't reached add values
    // if (heartRateValues.length < maxLenght){
      // document.querySelector(".heart-rates .grid").innerHTML += `<button>${currentBpm}</button>`;
      // heartRateValues.push(currentBpm)
    // }


  };

  const connect_miband = async () => {
    try {
      const options = {
        filters: [{ namePrefix: "Mi Smart Band" }],
        optionalServices: ["heart_rate"],
      };

      if (window.navigator && window.navigator.bluetooth) {
        // Here write your logic of mobileNavigatorObject.bluetooth.requestDevice();
        // Connect device
        const device = await navigator.bluetooth.requestDevice(options);
        console.log("Connect Miband - Device retrieved");
        
        const server = await device.gatt?.connect();
        console.log("Connect Miband - Server retrieved");
        
        // Get Herat Rate data
        const service = await server?.getPrimaryService("heart_rate");
        console.log("Connect Miband - Service retrieved");
        const characteristic = await service?.getCharacteristic(
          "heart_rate_measurement"
          );
          console.log("Connect Miband - Characteristic retrieved");

        // Listen to changes on the device
        await characteristic?.startNotifications();
        console.log("seems to work");
        characteristic?.addEventListener(
          "characteristicvaluechanged",
          handleHeartbeatChange
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>HeartBeats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">HeartBeats</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <IonCard>
          <IonCardContent>
            {bleAvailability ? "🟢" : "🔴"} Bluetooth API is{" "}
            {bleAvailability ? "supported" : "not supported"}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              Turn your heart rate into music notes
            </IonCardSubtitle>
            <IonCardTitle>HeartBeats</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quos
            illum ipsa error architecto sit labore ea nobis, accusantium ullam!
          </IonCardContent>
          <IonButton expand="block" disabled={!bleAvailability} onClick={() => connect_miband()}>
            Pair Device
            <IonIcon icon={bluetooth} />
          </IonButton>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Measuring Heart Rate</IonCardSubtitle>
            <IonCardTitle>Heart Rate</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>78bpm</IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
