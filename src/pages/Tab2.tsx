import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRange,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import ExploreContainer from '../components/ExploreContainer';
import "./Tab2.css";
import {
  chevronDownOutline,
  filterOutline,
  pauseOutline,
  playOutline,
  stopOutline,
} from "ionicons/icons";

const Tab2: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>();

  interface Song {
    name: string;
    beats: number[];
    id: number;
  }

  const [songs, setSongs] = useState<Song[]>([
    {
      name: "Crescendo",
      beats: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
      id: 20200125124400,
    },
    {
      name: "Diminuendo",
      beats: [120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70],
      id: 20200125124401,
    },
  ]);

  const handleMusicSelection = (
    event: React.MouseEvent<HTMLIonItemElement, MouseEvent>,
    { name, id, beats }: Song
  ): void => {
    setShowModal(true);
    // let id = event.currentTarget.key
    console.log(id, name, beats);
    // let songName = event.currentTarget.getAttribute("data-name") || "";
    setCurrentSong({ name, id, beats });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Playlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Modal triggered when selecting a song */}
        <IonModal
          isOpen={showModal}
          swipeToClose={true}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonCard className="ion-text-center">
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={chevronDownOutline} /> Close this
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonThumbnail>
              <img src="./assets/logo.png" alt="" />
            </IonThumbnail>
            <IonCardHeader>
              <IonCardSubtitle>saved on {currentSong?.id}</IonCardSubtitle>
              <IonCardTitle>{currentSong?.name}</IonCardTitle>
              <p>{currentSong?.beats.length} beats</p>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel slot="start">00:00</IonLabel>
                <IonRange></IonRange>
                <IonLabel slot="end">00:00</IonLabel>
              </IonItem>

              {/* Play Button */}
              <IonButton fill="clear" mode="ios">
                <IonIcon icon={playOutline} />
              </IonButton>

              {/* Pause Button */}
              <IonButton fill="clear" mode="ios">
                <IonIcon icon={pauseOutline} />
              </IonButton>

              {/* Stop Button */}
              <IonButton fill="clear" mode="ios">
                <IonIcon icon={stopOutline} />
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Next song popover */}
          {/* <IonItem>
            <IonLabel>Playing Next</IonLabel>
          </IonItem> */}
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
        <IonCard >
          <IonList>
            <IonListHeader>Saved entries</IonListHeader>

            {songs.map((song) => {
              return (
                <IonItem
                  key={song.id}
                  data-name={song.name}
                  onClick={(e) => handleMusicSelection(e, song)}
                >
                  <IonLabel>
                    <h2>{song.name}</h2>
                    <IonGrid>
                      <IonRow className="beats-indicator ion-align-items-end">

                      {song.beats.map((beat) => (
                        <IonCol color="tertiary" style={{height: beat/3}}></IonCol>
                        ))}
                        </IonRow>
                  </IonGrid>
                  </IonLabel>
                  <IonIcon slot="start" icon={playOutline} />
                  
                </IonItem>
              );
            })}

            {/* <IonItem data-name="Crescendo" onClick={(e) => handleMusicSelection(e)}>
              <IonIcon slot="end" icon={playOutline} />
              <IonLabel>Crescendo</IonLabel>
            </IonItem>
            <IonItem data-name="Diminuendo" onClick={(e) => handleMusicSelection(e)}>
              <IonIcon slot="end" icon={playOutline} />
              <IonLabel>Diminuendo</IonLabel>
            </IonItem> */}
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
