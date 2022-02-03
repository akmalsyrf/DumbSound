import React from "react";

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

export default function Player({ musics, selectedMusicIndex }) {
  const audioLists = musics.map((music) => ({
    name: music.title,
    singer: music.artist.name,
    cover: music.thumbnail,
    musicSrc: music.attache,
  }));

  const options = {
    playIndex: selectedMusicIndex,
    mode: "full",
    audioLists,
    defaultPlayIndex: 0,
    theme: "dark",
    remove: true,
    showPlay: true,
    showDestroy: false,
    responsive: false,
    defaultPosition: { bottom: 0, left: 0 },
    toggleMode: false,
    showDownload: false,
    showPlayMode: false,
    showThemeSwitch: false,
    showLyric: false,
    showReload: false,
    glassBg: true,
  };

  return (
    <>
      <ReactJkMusicPlayer {...options} />
    </>
  );
}
