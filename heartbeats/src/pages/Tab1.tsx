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
} from "@ionic/react";

// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { bluetooth } from "ionicons/icons";

const Tab1: React.FC = () => {
  // let mobileNavigatorObject: any = window.navigator;

  const [bleAvailability, setbleAvailability] = useState(false);

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
        const server = await device.gatt?.connect();

        // Get Herat Rate data
        const service = await server?.getPrimaryService("heart_rate");
        const characteristic = await service?.getCharacteristic(
          "heart_rate_measurement"
        );

        // Listen to changes on the device
        await characteristic?.startNotifications();
        console.log("seems to work");
        // characteristic.addEventListener(
        //   "characteristicvaluechanged",
        //   handleHeartbeatChange
        // );
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
          <IonButton expand="block" onClick={() => connect_miband()}>
            Pair Device
            <IonIcon icon={bluetooth} />
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
