import React from "react";
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
          <IonButton expand="block">
            <IonIcon icon={bluetooth} />
            Pair Device
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
