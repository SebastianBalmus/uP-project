import SessionData from '../types/SessionData';

const redirectToNextAudio = (action: string) => {
  const sessionData = JSON.parse(localStorage.getItem('sessionData') || '') as SessionData;

  if (
    (sessionData.pendingAudios.length === sessionData.numberOfPhrases)
    && (action === 'selectSex')
  ) {
    return `/session/${sessionData.code}/terms`;
  }

  if (sessionData.pendingAudios.length === 0) {
    return `/session/${sessionData.code}/done`;
  }

  return `/session/${sessionData.code}/audio/${sessionData.pendingAudios[0]}`;
};

export default redirectToNextAudio;
