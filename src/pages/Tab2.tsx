import React, {  useState } from "react";
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
  IonProgressBar,
  
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
  playOutline,
  stopOutline,
  volumeMuteOutline,
} from "ionicons/icons";
import * as Tone from "tone";

const Tab2: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  // const [songProgression, setSongProgression] = useState<number>(0);
  const [currentSynth, setCurrentSynth] = useState("1");
  const [currentSong, setCurrentSong] = useState<Song>({
    name: "",
    beats: [],
    id: 0,
  });

  const [localSongs, setLocalSongs] = useState<Song[]>(()=>{
    const localData = localStorage.getItem("heartbeats");
    var songs_data = localData ? JSON.parse(localData) : []; 
    // setSongs(localData ? JSON.parse(localData) : [])
    return songs_data
    // console.log(songs_data)
});

  
  interface Song {
    name: string;
    beats: number[];
    id: number;
  }
//   useEffect(()=>{
//     const localData = localStorage.getItem("heartbeats");
//     var songs_data = localData ? JSON.parse(localData) : []; 
//     // setSongs(localData ? JSON.parse(localData) : [])
//     console.log(songs_data)
// }, [])
let test =[
  {
    name: "Crescendo",
    beats: [
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95,
      100,
      105,
      110,
      115,
      120,
    ],
    id: 20200125124400,
  },
  {
    name: "Aleatória",
    beats: [
      120,
      100,
      85,
      90,
      75,
      55,
      65,
      110,
      80,
      50,
      45,
      115,
      95,
      60,
      70,
      105,
    ],
    id: 20200127103101,
  },
]
  const [songs, setSongs] = useState<Song[]>([...test, ...localSongs]);

  const playSong = (beats: number[]): void => {
    const membrane = new Tone.MembraneSynth().toDestination();
    const am = new Tone.AMSynth().toDestination();
    const fm = new Tone.FMSynth().toDestination();

    const synth = [am, fm, membrane];
    // higher number reduce interval
    let interval = "14n";
    let iterations = beats.length * 2;
    // Duration of notes, smaller values produce longer sound
    let amplitude = "16n";
    // How many notes are played from the beats
    let notes = 4 || beats.length;
    setLocalSongs([...localSongs]) //just to avoid an error
    let loop = new Tone.Loop();
    let index = 0;
    const repeat = () => {
      // console.log("repeat triggered", index/(iterations - 1));
      // console.log(Math.abs(((index+1) % notes) * notes - 1))
      synth[parseInt(currentSynth)].triggerAttackRelease(
        beats[index % notes],
        amplitude
      );

      // console.log(index % 8);
      index++;
      // setSongProgression(parseFloat((index/iterations).toFixed(2)))
      if (index >= iterations) {
        // setSongProgression(0)
        loop.dispose();
        Tone.Transport.stop();
        Tone.Transport.cancel();
        console.log(loop);

      }
    };
    // if (beats && beatIndex < beats.length) {
    loop.iterations = iterations;
    loop.interval = interval;
    loop.callback = repeat;
    loop.start(0);
    console.log("beatIndex after loop", beats);
    console.log(loop);
  };

  const handleMusicSelection = (
    event: React.MouseEvent<HTMLIonItemElement, MouseEvent>,
    { name, id, beats }: Song
  ): void => {
    setShowModal(true);

    console.log("current song set", currentSong);
    const localData = localStorage.getItem("heartbeats");
    let songs_data = localData ? JSON.parse(localData) : [];
    setSongs([...test,...songs_data]);
    Tone.Transport.start();
    playSong(beats);
    // Tone.Transport.scheduleRepeat(playSong, "1n");
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
          cssClass="player-modal"
          onDidDismiss={() => {
            setShowModal(false);
            Tone.Transport.stop();
            Tone.Transport.cancel();
          }}
          mode="ios"
        >
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={chevronDownOutline} /> Close this
                </IonButton>
              </IonButtons>
            </IonToolbar>
          <IonCard className="ion-text-center">
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
                {/* <IonLabel slot="start"></IonLabel> */}
                <IonProgressBar
                  color="primary"
                  type="indeterminate"
                  value={1}
                ></IonProgressBar>
                {/* <IonLabel slot="end">00:00</IonLabel> */}
              </IonItem>

              {/* Play Button */}
              <IonButton fill="clear" mode="ios">
                <IonIcon icon={playOutline} />
              </IonButton>

              {/* Pause Button */}
              <IonButton fill="clear" mode="ios">
                <IonIcon icon={volumeMuteOutline} />
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
              value={currentSynth}
              mode="ios"
              onIonChange={(e) => setCurrentSynth(e.detail.value || "0")}
            >
              <IonSegmentButton value="0">
                <IonLabel>AM</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="1">
                <IonLabel>FM</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="2">
                <IonLabel>Membrane</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>
        <IonCard className="tracks">
          <IonList>
            <IonListHeader>Saved Tracks</IonListHeader>

            {songs.map((song) => {
              return (
                <IonItem
                  key={song.id}
                  data-name={song.name}
                  onClick={(e) => {
                    handleMusicSelection(e, song);
                    setCurrentSong(song);
                  }}
                >
                  <IonThumbnail>
                    <img src="./assets/logo.png" alt="" />
                  </IonThumbnail>
                  <IonLabel className="ion-padding">
                    <h2>{song.name}</h2>
                    <IonGrid>
                      <IonRow className="beats-indicator ion-align-items-end">
                        {song.beats.map((beat, index) => (
                          <IonCol
                            key={song.id + index}
                            color="tertiary"
                            style={{ height: beat / 4 }}
                          ></IonCol>
                        ))}
                      </IonRow>
                    </IonGrid>
                  </IonLabel>
                  {/* <IonIcon slot="start" icon={playOutline} /> */}
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
