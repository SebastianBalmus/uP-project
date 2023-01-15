import { useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';

const useRecorder = () => {
  const [recorder, setRecorder] = useState<RecordRTC | null>();

  const getRecordingPermission = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const recorderInstance = new RecordRTC(stream, {
      type: 'audio',
    });
    setRecorder(recorderInstance);
  };

  useEffect(() => {
    getRecordingPermission();
  }, []);

  return recorder as RecordRTC;
};

export default useRecorder;
