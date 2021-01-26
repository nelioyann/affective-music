import React from 'react';
import { IonContent, IonHeader, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {

  const slideOpts = {
    initialSlide: 1,
    speed: 400
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

        <img src="./assets/logo.png" alt="Logo"/>
        <h2>Enable visibility on your Mi App</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit et consequuntur culpa voluptatem reprehenderit sapiente atque maxime aut ex voluptatum.</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div>

        <img src="./assets/logo.png" alt="Logo"/>
        <h2>Launch a Freestyle Workout</h2>
        </div>
      </IonSlide>
      <IonSlide>
      <div>

<img src="./assets/logo.png" alt="Logo"/>
<h2>Pair your device</h2>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit et consequuntur culpa voluptatem reprehenderit sapiente atque maxime aut ex voluptatum.</p>
</div>
      </IonSlide>
    </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
