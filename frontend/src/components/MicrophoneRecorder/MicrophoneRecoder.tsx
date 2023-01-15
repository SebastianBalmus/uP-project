/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import useRecorder from '../../hooks/useRecorder';
import { AxiosResponse } from 'axios';
import { getPhrase, joinSession, submitPhrase } from '../../backend';
import PhraseData from '../../types/PhraseData';

import './MicrophoneRecorder.css';
import SessionData from "../../types/SessionData";
import redirectToNextAudio from "../../utils/redirectToNextAudio";

const MicrophoneRecorder: React.FC = () => {
  const [phrase, setPhrase] = useState<PhraseData | null>();
  const [blob, setBlob] = useState<Blob | null>();
  const [blobUrl, setBlobUrl] = useState<string | null>();
  const recorder = useRecorder();
  const { sessionCode, audioId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPhrase(audioId || '').then((response: AxiosResponse<PhraseData>) => {
      setPhrase(response.data);
    });
  }, []);

  const startRecording = () => {
    setBlobUrl(null);
    recorder?.startRecording();
  };

  const stopRecording = () => {
    recorder.stopRecording(() => {
      const blobCurrentValue = recorder.getBlob();
      setBlobUrl(URL.createObjectURL(blobCurrentValue));
      setBlob(blobCurrentValue);
    });
  };

  const submitFunction = async () => {
    if (blob && audioId && phrase) {
      const file = new File([blob], `${phrase.id}.wav`)
      await submitPhrase(audioId, file);
      const sessionData = JSON.parse(localStorage.getItem('sessionData') || '') as SessionData;
      joinSession(sessionData.code).then((response) => {
        localStorage.setItem('sessionData', JSON.stringify(response.data));
        navigate(redirectToNextAudio(''));
        window.location.reload();
      });
    }
  }

  return (
    <section className="recorder">
      <div className="phrase-wrapper">
        {phrase && (
          <h1>{phrase.text}</h1>
        )}
      </div>
      <div className="audio-wrapper">
        { blobUrl && (
          <audio controls>
            <source src={blobUrl} type="audio/wav" />
          </audio>
        )}
      </div>
      <div className="controls-wrapper">
        <Button
          disableElevation
          variant="contained"
          onClick={startRecording}
        >
          Start recording
        </Button>
        <Button
          disableElevation
          variant="contained"
          onClick={stopRecording}
        >
          Stop recording
        </Button>
        <Button
          disableElevation
          variant="contained"
          onClick={submitFunction}
        >
          Submit
        </Button>
      </div>
    </section>
  );
};

export default MicrophoneRecorder;
