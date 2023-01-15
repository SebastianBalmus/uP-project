/* eslint-disable */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { useParams, useNavigate, redirect } from 'react-router-dom';
import { updateSex } from '../../backend';
import redirectToNextAudio from '../../utils/redirectToNextAudio';
import './AcceptTerms.css';

const AcceptTerms: React.FC = () => {
  const { sessionCode } = useParams();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const validationSchema = Yup.object({
    accept: Yup.boolean().oneOf([true], 'You must accept terms and conditions!').required(),
    sex: Yup.string().oneOf(['M', 'F'], 'You must select your sex!').required(),
  });

  const submitFunction = (values: any) => {
    if (sessionCode) {
      updateSex(sessionCode, values.sex).then(() => {
        navigate(redirectToNextAudio(''));
        // window.location.reload();
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      accept: false,
      sex: 'M',
    },
    validationSchema,
    onSubmit: (values) => submitFunction(values),
  });

  return (
    <section className="terms-of-service">
      <div className="terms-content">
        <h1>Terms of service</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="accept-terms-form">
        <div className="accept-terms-form-controls">
          <FormControlLabel
            control={(
              <Checkbox
                color="info"
                value={formik.values.accept}
                required
              />
            )}
            label={<p>Accept</p>}
            name="accept"
            onChange={formik.handleChange}
          />
          <FormControl color="info">
            <FormLabel>Sex</FormLabel>
            <RadioGroup
              row
              name="sex"
              value={formik.values.sex}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="F"
                control={(
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#FFFCF2',
                      },
                    }}
                  />
                )}
                label={<p>Female</p>}
              />
              <FormControlLabel
                value="M"
                control={(
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#FFFCF2',
                      },
                    }}
                  />
                )}
                label={<p>Male</p>}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Button
          disableElevation
          type="submit"
          variant="contained"
          color="info"
        >
          Submit
        </Button>
      </form>
    </section>
  );
};

export default AcceptTerms;
