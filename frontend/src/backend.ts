import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const joinSession = (sessionCode: string) => axios.get(
  '/join-session',
  {
    params: {
      sessionCode,
    },
  },
);

export const updateSex = (sessionCode: string, sex: string) => axios.post(
  '/select-sex/',
  {
    sessionCode,
    sex,
  },
);

export const getPhrase = (audioId: string) => axios.get(
  '/record-audio/',
  {
    params: {
      audioId,
    },
  },
);

export const submitPhrase = (audioId: string, file: File) => axios.patch(
  `/audios/${audioId}/`,
  {
    file,
  },
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
);
