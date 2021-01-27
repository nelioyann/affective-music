import React from "react";
import {
  IonContent,
  IonHeader,
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSlides mode="ios" pager={true} options={slideOpts}>
          <IonSlide>
            <div>
              <img src="./assets/logo.png" alt="Logo" />
              <h3>Enable Mi Band Visibility</h3>
              <p>
                To allow pairing with HeartBeats, enable device visibility on
                the Mi Fit App.{" "}
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
              <p>Pair your device and record a sample of beats. Then listen to your tracks in the resulting playlist.</p>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
