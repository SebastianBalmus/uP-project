type SessionData = {
  url: string;
  id: number;
  code: string;
  expiration: string;
  numberOfPhrases: number;
  submittedAudios: number[];
  pendingAudios: number[];
};

export default SessionData;
