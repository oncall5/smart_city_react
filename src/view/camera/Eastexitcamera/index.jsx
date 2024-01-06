import React, { useEffect, useRef } from 'react';
import flvjs from 'flv.js';
import './style.css'
export default function Eastexitcamera() {
  const videoRef = useRef(null);
  let flvPlayer = null;

  // useEffect(() => {
  //   if (flvjs.isSupported()) {
  //     flvPlayer = flvjs.createPlayer({
  //       type: 'mp4',
  //       isLive: true,
  //       hasAudio: false,
  //       url: require('../../../assets/video/movie.mp4'),
  //       // url: "http://10.11.24.154:8002/flv?port=1935&app=myapp&stream=test2"
  //       // url:streamUrl('colour-label')
  //       // url:'http://10.11.24.56:8002/live?port=1935&app=myapp&stream=test2'
  //       // url: "http://172.20.10.6:8080/live?port=1935&app=myapp&stream=mystream"
  //     });

  //     flvPlayer.attachMediaElement(videoRef.current);
  //     flvPlayer.current.load();
  //     flvPlayer.current.play();
  //   }

  //   return () => {
  //     if (flvPlayer.current) {
  //       flvPlayer.current.destroy();
  //     }
  //   };
  // }, []);

  const play = () => {
    if (flvPlayer) {
      flvPlayer.play();
    }
  };

  return (
    <div>
      <div className="row">
        <h4 style={{ textAlign: 'center' }}>监控视频</h4>
        <video src={require('../../../assets/video/movie.mp4').default} controls autoPlay muted width="1200" height="800"></video>
        {/* <video ref={videoRef} controls autoPlay muted width="1200" height="800" /> */}
        {/* <button onClick={play}>播放</button> */}
      </div>
    </div>
  );
}