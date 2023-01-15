import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { joinSession } from '../../backend';
import redirectToNextAudio from '../../utils/redirectToNextAudio';
import './JoinSessionForm.css';

const JoinSessionForm: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    sessionCode: Yup.string().required(),
  });

  const submitFucntion = (values: { sessionCode: string; }) => {
    joinSession(values.sessionCode).then((response) => {
      localStorage.setItem('sessionData', JSON.stringify(response.data));
      navigate(redirectToNextAudio('selectSex'));
      window.location.reload();
    });
  };

  const formik = useFormik({
    initialValues: {
      sessionCode: '',
    },
    validationSchema,
    onSubmit: (values) => {
      submitFucntion(values);
    },
  });

  return (
    <section className="join-session-wrapper">
      <form className="join-session-form" onSubmit={formik.handleSubmit}>
        <h1>Logo</h1>
        <TextField
          fullWidth
          id="sessionCode"
          name="sessionCode"
          label="Session Code"
          color="info"
          variant="filled"
          value={formik.values.sessionCode}
          onChange={formik.handleChange}
          error={formik.touched.sessionCode && Boolean(formik.errors.sessionCode)}
          helperText={formik.touched.sessionCode && formik.errors.sessionCode}
        />
        <Button
          disableElevation
          type="submit"
          variant="contained"
          color="info"
        >
          Join session
        </Button>
      </form>
    </section>
  );
};

export default JoinSessionForm;
