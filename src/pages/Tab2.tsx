import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import ExploreContainer from '../components/ExploreContainer';
import "./Tab2.css";
import { filterOutline, playOutline } from "ionicons/icons";

const Tab2: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [currentSong, setCurrentSong] = useState("")


  const handleMusicSelection = (event: React.MouseEvent<HTMLIonItemElement, MouseEvent>) : void =>{
    setShowModal(true)
    let songName = event.currentTarget.getAttribute("data-name") || ""; 
    setCurrentSong(songName)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Playlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      <IonModal isOpen={showModal} >
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(false)}>
              <IonIcon  icon={filterOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonCard>
          <img width="200" src="./assets/logo.png" alt=""/>
          <IonCardHeader>
            <IonCardTitle>
              {currentSong}
            </IonCardTitle>
            <IonCardSubtitle>
              saved on 00.00.0
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
          <IonItem>
          <IonRange></IonRange>
          <IonLabel slot="start">
            00:00
          </IonLabel>
          <IonLabel slot="end">
            00:00
          </IonLabel>
        </IonItem>
          </IonCardContent>

        </IonCard>

        <IonItem>
          <IonLabel>
            Playing Next
          </IonLabel>
        </IonItem>

        
      </IonModal>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Playlist</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Select a synth</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSegment
              value="am"
              onIonChange={(e) =>
                console.log("Segment selected", e.detail.value)
              }
            >
              <IonSegmentButton value="am">
                <IonLabel>AM</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="fm">
                <IonLabel>FM</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="membrane">
                <IonLabel>Membrane</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonList>
            <IonListHeader>Saved entries</IonListHeader>
            <IonItem data-name="Crescendo" onClick={(e) => handleMusicSelection(e)}>
              <IonIcon slot="end" icon={playOutline} />
              <IonLabel>Crescendo</IonLabel>
            </IonItem>
            <IonItem data-name="Diminuendo" onClick={(e) => handleMusicSelection(e)}>
              <IonIcon slot="end" icon={playOutline} />
              <IonLabel>Diminuendo</IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
