import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Playlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
        <IonSegment value="am" onIonChange={e => console.log('Segment selected', e.detail.value)}>
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
          <IonCardHeader>
            <IonCardSubtitle>Listen to your past recordings</IonCardSubtitle>
            <IonCardTitle>Saved entries</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Lorem ipsum dolor sit amet.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
