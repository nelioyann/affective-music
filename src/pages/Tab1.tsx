import React, { useEffect, useState } from "react";
// import * as Tone from "tone";
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
  IonFab,
  IonFabButton,
  IonModal,
  IonButtons,
} from "@ionic/react";

// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import {
  bluetooth,
  chevronDownOutline,
  logOutOutline,
  radioButtonOn,
} from "ionicons/icons";

const Tab1: React.FC = () => {
  // let mobileNavigatorObject: any = window.navigator;
  interface Song {
    name: string;
    beats: number[];
    id: number;
  }

  const [bleAvailability, setbleAvailability] = useState(false);
  const [isPaired, setIsPaired] = useState(false);
  const [hrValue, setHrValue] = useState(0);
  const [recordModal, setRecordModal] = useState(false);
  const [newRecording, setNewRecording] = useState<number[]>([]);
  const [song, setSong] = useState<Song>()

  const [pairedToast, setPairedToast] = useState(false);
  const [recordedToast, setRecordedToast] = useState(false);
  const [disconnectedToast, setDisconnectedToast] = useState(false);
  const [device, setDevice] = useState<any>()

  useEffect(() => {
    checkBlAvailability();
  }, [bleAvailability]);

  useEffect(() => {
    // console.log("it changed");
    if (newRecording.length < 16 && hrValue !== 0) {
      setNewRecording(newRecording => [...newRecording, hrValue]);
    }
    // eslint-disable-next-line
  }, [hrValue]);

  useEffect(() => {
    // console.log("it changed", song);
    if (song){
      const localData = localStorage.getItem("heartbeats");
      let data =  localData ? JSON.parse(localData) : []
      data.push(song)
      localStorage.setItem("heartbeats", JSON.stringify(data))
    }
    // setNewRecording([...newRecording, hrValue])
  }, [song]);

  // var server: any;

  // Checks if BLE pairing is supported
  const checkBlAvailability = async () => {
    try {
      const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
      // console.log("check ble a ");
      setbleAvailability(isBluetoothAvailable);
    } catch (error) {
      console.log("Argh! " + error);
    }
  };

  const handleHeartbeatChange = (event: Event) => {
    // let {target} = event;
    // if (queryUnpair) {
    //   device?.gatt?.disconnect();
    //   return null;
    // }

    // As input element otherwise the value can't be retrieved
    let target = event.target as HTMLInputElement;
    let value = (target.value as unknown) as DataView;
    // console.log(value)
    // console.log("device",device)
    // let value = target?.value;
    // console.log(value)
    // if(target && target.value)
    var a = [];
    for (var i = 0; i < value?.byteLength; i++) {
      a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }
    let currentBpm = parseInt(a.join(" ").slice(-4));
    // console.log(currentBpm)
    // synth.triggerAttackRelease(currentBpm * 10, "4n");
    setHrValue(currentBpm);
    let test = [...newRecording];
    test.push(currentBpm);
    // console.log([...newRecording, currentBpm])
    // setNewRecording(test)

    // if(recordModal){
    // }

    // As long as the lenght isn't reached add values
    // if (heartRateValues.length < maxLenght){
    // document.querySelector(".heart-rates .grid").innerHTML += `<button>${currentBpm}</button>`;
    // heartRateValues.push(currentBpm)
    // }
  };

  const connect_miband = () => {
    try {
      const options = {
        filters: [{ namePrefix: "Mi Smart Band" }],
        optionalServices: ["heart_rate"],
      };

      if (window.navigator && window.navigator.bluetooth) {
        // Here write your logic of mobileNavigatorObject.bluetooth.requestDevice();
        // Connect device
        navigator.bluetooth.requestDevice(options).then((BTdevice) => {
          setDevice(BTdevice);
          console.log("Connect Miband - Device retrieved", BTdevice);
          BTdevice.gatt?.connect().then((server) => {
            console.log("Connect Miband - Server retrieved");
            // Get Herat Rate data
            server?.getPrimaryService("heart_rate").then((service) => {
              console.log("Connect Miband - Service retrieved");
              service
                ?.getCharacteristic("heart_rate_measurement")
                .then((characteristic) => {
                  console.log("Connect Miband - Characteristic retrieved");

                  characteristic?.startNotifications();
                  console.log("seems to work");
                  setIsPaired(true);
                  setPairedToast(true);
                  characteristic?.addEventListener(
                    "characteristicvaluechanged",
                    handleHeartbeatChange
                  );
                });
            });
          });

          // Listen to changes on the device
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect_miband =  () => {
    console.log("I wish to disconnect");
    // navigator.bluetooth.getDevices()
    if (!device) return;
    // console.log(server)
    if(device && device?.gatt){
      console.log("disconnecting device")
      if(device.gatt.connected) device.gatt.disconnect();
      // TODO add a notification
      setIsPaired(false)
      setDisconnectedToast(true)
      console.log("device disconnected")
    }
  };

  const saveRecording = () =>{
    console.log("I wish to record");
    let id = Date.now()
    let newSong: Song = {
      name: `Song_${id}`,
      beats: newRecording,
      id
    }
    setSong(newSong) 
    setRecordedToast(true) // Notify the user of the saving
    setNewRecording([]) // Empty current recording
    setRecordModal(false) // Hide the modal
    // Toast Saved
   
    // console.table(song)
  }
  const handleRecording = () => {};
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
          message="Device paired"
          duration={500}
        />
        <IonToast
          isOpen={disconnectedToast}
          message="Device disconnected"
          duration={800}
        />
        <IonToast
          isOpen={recordedToast}
          message="New recording saved"
          duration={800}
        />

        <IonModal
          isOpen={recordModal}
          cssClass="recording-modal"
          onDidDismiss={() => setRecordModal(false)}
          swipeToClose={true}
          mode="ios"
        >
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={() => setRecordModal(false)}>
                <IonIcon icon={chevronDownOutline} /> Close this
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonCard>
            <h2>Monitoring Heart rate</h2>

            <h2>{hrValue}</h2>
              <div className="recordings-indicator ion-align-items-end">
                {newRecording.map((beat, index) => (
                  <span key={index} className="indicator"
                  style={{ height: beat * 2 }}></span>
                ))}
              </div>

          </IonCard>
            <div className="ion-padding">

            <IonButton disabled={newRecording.length === 16 ? false : true} onClick={()=> saveRecording()}>
              Save this
            </IonButton>
            <IonButton onClick={()=> setNewRecording([])}>
              Clear current recording
            </IonButton>
            </div>
        </IonModal>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">HeartBeats</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <IonCard>
          <IonCardContent>
            {bleAvailability ? "🟢" : "🔴"} Bluetooth API is{" "}
            {bleAvailability
              ? "supported"
              : "not supported in this browser or device"}
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
            Record your heart beats, choose the right music synthetiser for you
            and listen to the resulting song. All recordings are saved locally.
          </IonCardContent>
          <div className="ion-padding">
            <IonButton
              fill="outline"
              disabled={!bleAvailability || isPaired}
              onClick={() => connect_miband()}
            >
              Pair
              <IonIcon slot="start" icon={bluetooth} />
            </IonButton>
            <IonButton
              fill="clear"
              disabled={!bleAvailability || !isPaired}
              onClick={() => disconnect_miband()}
            >
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
            <IonProgressBar value={(hrValue - 40) / 160}></IonProgressBar>
          </IonCardContent>
        </IonCard>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton
            disabled={!isPaired}
            onClick={() => {
              setRecordModal(true);
              handleRecording();
            }}
          >
            <IonIcon icon={radioButtonOn} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
