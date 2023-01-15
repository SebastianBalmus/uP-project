import React from 'react';
import MicrophoneRecoder from '../components/MicrophoneRecorder/MicrophoneRecoder';
import Layout from '../components/Layout/Layout';

const RecordPhrase: React.FC = () => (
  <Layout>
    <MicrophoneRecoder />
  </Layout>
);

export default RecordPhrase;
