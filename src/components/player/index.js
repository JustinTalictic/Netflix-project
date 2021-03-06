import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, Overlay, Inner, Close } from './styles/player';

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
    const [showPlayer, setShowPlayer] = useState(false);

    return (
        <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
            <Container {...restProps}>{children}</Container>
        </PlayerContext.Provider>
    );
}

Player.Video = function PlayerVideo({ ...restProps }) {
    const { showPlayer, setShowPlayer } = useContext(PlayerContext);

    return showPlayer
        ? ReactDOM.createPortal(
              <Overlay>
                  <Inner>
                      <video id="netflix-player" controls autoPlay>
                          <source
                              src="/videos/Netflix-Default-Video.mp4"
                              type="video/mp4"
                          />
                      </video>
                      <Close onClick={() => setShowPlayer(false)}>
                          <img src="/images/icons/close-slim.png" alt="Close" />
                      </Close>
                  </Inner>
              </Overlay>,
              document.body
          )
        : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
    const { showPlayer, setShowPlayer } = useContext(PlayerContext);

    return (
        <Button onClick={() => setShowPlayer(!showPlayer)}>
            <img src="/images/icons/play-arrow.png" alt="play-arrow" />
            Play
        </Button>
    );
};
