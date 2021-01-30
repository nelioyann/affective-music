import React, { useState } from "react";
import Lottie from "react-lottie";
import bluetoothAnimation from "../lotties/bluetooth.json";
import recordAnimation from "../lotties/record.json";
import enableAnimation from "../lotties/enable.json";
import {
  IonButton,
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

  const btOptions = {
    loop: true,
    autoplay: true,
    animationData: bluetoothAnimation,
  };
  const recordOptions = {
    loop: true,
    autoplay: true,
    animationData: recordAnimation,
  };
  const enableOptions = {
    loop: true,
    autoplay: true,
    animationData: enableAnimation,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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

          <IonButton onClick={() => setShowInfoModal(false)}>Close</IonButton>
        </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSlides mode="ios" pager={true} options={slideOpts}>
          <IonSlide>
            <div>
              {/* <img src="./assets/logo.png" alt="Logo" /> */}
              <Lottie options={btOptions} height={200} width={300} />
              <h3>Enable Mi Band Discoverability</h3>
              <p>
                To allow pairing with HeartBeats, enable device visibility on
                the Mi Fit App.
              </p>
            </div>
          </IonSlide>
          <IonSlide>
            <div>
              {/* <img src="./assets/logo.png" alt="Logo" /> */}
              <Lottie options={enableOptions} height={200} width={300} />
              <h3>Start a Freestyle Workout Session</h3>
              <p>
                In order to increase the heart rate detection rate, try
                launching a workout exercise session on your Mi Band.
              </p>
            </div>
          </IonSlide>
          <IonSlide>
            <div>
              {/* <img src="./assets/logo.png" alt="Logo" /> */}

              <Lottie options={recordOptions} height={200} width={300} />
              <h3>Pair your device and record </h3>
              <p>
                Pair your device and record a sample of beats. Then listen to
                your tracks in the resulting playlist.
              </p>
              <IonButton
                onClick={() => setShowInfoModal(true)}
                style={{ borderRadius: "5px" }}
                color="primary"
                fill="outline"
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
