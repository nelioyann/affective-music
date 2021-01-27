import React, { useEffect, useState } from "react";
import * as Tone from 'tone';
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
  IonToast,
  IonBadge,
  IonProgressBar,
  IonButtons,
  IonFab,
  IonFabButton,
} from "@ionic/react";

// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { add, bluetooth, logOutOutline } from "ionicons/icons";



const Tab1: React.FC = () => {

  const synth = new Tone.Synth().toDestination();
  // let mobileNavigatorObject: any = window.navigator;

  const [bleAvailability, setbleAvailability] = useState(false);
  const [isPaired, setIsPaired] = useState(false);
  const [hrValue, setHrValue] = useState(0);

  const [pairedToast, setPairedToast] = useState(false);

  useEffect(()=>{
    checkBlAvailability()
  }, [bleAvailability])


  var device: BluetoothDevice;
  
  // Checks if BLE pairing is supported
  const checkBlAvailability = async () => {
    try {
      const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
      console.log("check ble a ");
      setbleAvailability(isBluetoothAvailable);
    } catch (error) {
      console.log("Argh! " + error);
    }
  };

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
    synth.triggerAttackRelease(currentBpm*10, "4n")
    setHrValue(currentBpm)

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
        device = await navigator.bluetooth.requestDevice(options);
        console.log("Connect Miband - Device retrieved", device);
        
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
        setIsPaired(true)
        setPairedToast(true)
        characteristic?.addEventListener(
          "characteristicvaluechanged",
          handleHeartbeatChange
        );
      }
    } catch (e) {
      console.log(e);
    }

    
  };

  const disconnect_miband = () =>{
    console.log("Bug")
    // if (!device) return;
    console.log(device?.gatt?.connected)
    if(device && device?.gatt){
      console.log("disconnecting device")
      if(device.gatt.connected) device.gatt.disconnect();
      // TODO add a notification
      setIsPaired(false)
      console.log("device disconnected")
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>HeartBeats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonToast
        isOpen={pairedToast}
        message="Device pairedToast"
        duration={500}
      />
      {/* <IonToast
        isOpen={!isPaired}
        message="Device not paired"
        duration={500}
      /> */}


        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">HeartBeats</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <IonCard>
          <IonCardContent>
            {bleAvailability ? "🟢" : "🔴"} Bluetooth API is{" "}
            {bleAvailability ? "supported" : "not supported in this browser or device"}
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
            Record your heart beats, choose the right music synthetiser for you and listen to the resulting song.
            All recordings are saved locally.
          </IonCardContent>
          <div className="ion-padding">

          <IonButton  fill="clear"  disabled={!bleAvailability || isPaired} onClick={() => connect_miband()}>
            Pair 
            <IonIcon slot="start" icon={bluetooth} />
          </IonButton>
          <IonButton  disabled={false} onClick={() => disconnect_miband()}>
            UnPair 
            <IonIcon icon={logOutOutline} />
          </IonButton>
          </div>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Measuring Heart Rate</IonCardSubtitle>
            <IonCardTitle>Heart Rate (bpm)</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <IonBadge color="warning">{hrValue} bpm</IonBadge>
          <IonProgressBar value={(hrValue - 40)/160}></IonProgressBar>
          </IonCardContent>
        </IonCard>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
