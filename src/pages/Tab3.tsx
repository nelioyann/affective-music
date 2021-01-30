import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";

const Tab3: React.FC = () => {
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  const [showInfoModal, setShowInfoModal] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonModal isOpen={showInfoModal} swipeToClose={true}>
          <IonCard>
            <IonHeader>
              <IonCardTitle>About HeartBeats</IonCardTitle>
            </IonHeader>

            <IonCardContent>Heartbeats</IonCardContent>
          </IonCard>


          <IonCard>
            <IonHeader>
              <IonCardTitle>How does it work</IonCardTitle>
            </IonHeader>

            <IonCardContent>Heartbeats</IonCardContent>
          </IonCard>
          <IonCard>
            <IonHeader>
              <IonCardTitle>What do I need</IonCardTitle>
            </IonHeader>

            <IonCardContent>You will need a phone with a modern browser that supports the Web
            Bluetooth API.</IonCardContent>
          </IonCard>
          

          <IonButton onClick={() => setShowInfoModal(false)}>
            Close Info
          </IonButton>
        </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSlides mode="ios" pager={true} options={slideOpts}>
          <IonSlide>
            <div>
              <img src="./assets/logo.png" alt="Logo" />
              <h3>Enable Mi Band Discoverability</h3>
              <p>
                To allow pairing with HeartBeats, enable device visibility on
                the Mi Fit App.
              </p>
            </div>
          </IonSlide>
          <IonSlide>
            <div>
              <img src="./assets/logo.png" alt="Logo" />
              <h3>Start a Freestyle Workout Session</h3>
              <p>
                In order to increase the heart rate detection rate, try
                launching a workout exercise session on your Mi Band.
              </p>
            </div>
          </IonSlide>
          <IonSlide>
            <div>
              <img src="./assets/logo.png" alt="Logo" />
              <h3>Pair your device and record </h3>
              <p>
                Pair your device and record a sample of beats. Then listen to
                your tracks in the resulting playlist.
              </p>
              <IonButton
                onClick={() => setShowInfoModal(true)}
                style={{ borderRadius: "5px" }}
                color="primary"
              >
                Learn More
              </IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
