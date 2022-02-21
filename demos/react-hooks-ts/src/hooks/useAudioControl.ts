// 音频加载事件:  loadstart → durationchange → loadedmetadata → loadeddata → progress → canplay → canplaythrough
// 音频属性: currentTime, duration, muted, playBackRate, seeking, volume
// 对应的音频操作事件: playing, pause, timeupdate, volumechange, ratechange, waiting, seeking(拖拽播放)
// api如下:
// const audioControl = useAudioControl(audioRef);
//   const {
//     state: { duration, playing, currentTime, volume, muted, speedRate, seekingRef },
//     action: { play, pause, seek, updateCurrentTime, updateVolume, updateSpeedRate },
//   } = audioControl;

import { useState, useRef, useLayoutEffect, useEffect } from "react";

export type Resource = {
  id: string;
  src: string;
  type: "audio" | "video" | "image";
};

const useAudioPlay = (audioRef: HTMLAudioElement) => {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.addEventListener("playing", () => {
      setPlaying(true);
    });
    audio.addEventListener("pause", () => {
      setPlaying(false);
    });
  }, []);

  const play = () => {
    audioRef.current && audioRef.current.play();
  };

  const pause = () => {
    audioRef.current && audioRef.current.pause();
  };
  return {
    playing,
    play,
    pause,
  };
};

const useAudioDuraion = (audioRef: HTMLAudioElement) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0.1);
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.addEventListener("durationchange", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
  }, []);
  const updateCurrentTime = (value: number) => {
    console.log("value", value);
    audioRef.current.currentTime = value;
  };
  return {
    currentTime,
    updateCurrentTime,
    duration,
  };
};

const useAudioVolume = (audioRef) => {
  // volume的范围: [0,1]
  const [volume, setVolume] = useState(0.5);
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.addEventListener("volumechange", () => {
      setVolume(audioRef.current.volume);
    });
  }, []);
  const updateVolume = (value) => {
    audioRef.current.volume = value;
  };
  return {
    volume,
    updateVolume,
  };
};

const useAudioControl = (item: Resource) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useLayoutEffect(() => {
    if (!audioRef.current) {
      audioRef.current = document.createElement("audio");
      audioRef.current.src = item.src;
      audioRef.current.preload = "auto";
    }
  });

  // 播放暂停
  const { playing, play, pause } = useAudioPlay(audioRef);

  // 时间显示
  const { currentTime, updateCurrentTime, duration } =
    useAudioDuraion(audioRef);

  // 声音操作
  const { volume, updateVolume } = useAudioVolume(audioRef);

  return {
    state: {
      playing,
      currentTime,
      duration,
      volume,
    },
    action: {
      play,
      pause,
      updateCurrentTime,
      updateVolume,
    },
  };
};

export default useAudioControl;
