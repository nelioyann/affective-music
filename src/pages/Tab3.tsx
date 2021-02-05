import React, { useState } from "react";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";

const Tab3: React.FC = () => {

  const [showInfoModal, setShowInfoModal] = useState(false);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonModal
          isOpen={showInfoModal}
          swipeToClose={true}
          mode="ios"
          onDidDismiss={() => setShowInfoModal(false)}
        >
          {/* <IonCard>
            <IonHeader>
              <IonCardTitle>
                <h2>About HeartBeats</h2>
              </IonCardTitle>
            </IonHeader>

            <IonCardContent>Heartbeats</IonCardContent>
          </IonCard> */}


          <IonButton onClick={() => setShowInfoModal(false)}>Close</IonButton>
        </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonCard>
            <IonHeader>
              <IonCardTitle className="ion-padding-horizontal">
                <h2>How does it work</h2>
              </IonCardTitle>
            </IonHeader>

            <IonCardContent>
              <p>
                HeartBeats uses the Web Bluetooth API to connect to your Mi
                Band. After pairing your device and starting a new workout
                session, you will be able to record heart rate. These values are
                then converted in sounds and played sequencially in the player.
              </p>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonHeader>
              <IonCardTitle className="ion-padding-horizontal">
                <h2>What do I need</h2>
              </IonCardTitle>
            </IonHeader>

            <IonCardContent className="ion-no-padding">
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h3>Android device</h3>
                    <p>The Web Bluetooth API is not supported on IOS</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Browser with Web Bluetooth API Support</h3>
                    <p>Google Chrome</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Mi Fit App</h3>
                    <p>Allows you to enable discoverability</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
