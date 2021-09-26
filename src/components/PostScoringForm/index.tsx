import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import strings from "../../strings.json";
import CustomRating from "./CustomRating";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  caption: {
    minHeight: theme.spacing(10),
  },
}));

export interface FormValues {
  quotesAndWords: string | null;
  otherComments: string | null;
  reportReasons: string[];
  generalHarm: number;
  sexualHarm: number;
}

interface CommentFormProps {
  reportReasons: DbString[];
  post: Post;
  onSkip: () => void;
  onSubmit: (values: FormValues) => void;
}

function validate(values: FormValues) {
  const errors: { sexualHarm?: string } = {};
  if (!values.sexualHarm) {
    errors.sexualHarm = strings.required;
  }
  return errors;
}

const HtmlWithNewLines = ({ text }: { text: string }) => {
  return text.split("\n").map((item, key) => (
    <span key={key}>
      {item}
      <br />
    </span>
  )) as any;
};

const CommentForm: FunctionComponent<CommentFormProps> = (
  props: CommentFormProps
) => {
  const { reportReasons, post, onSkip, onSubmit } = props;
  const initialValues: FormValues = {
    quotesAndWords: null,
    otherComments: null,
    reportReasons: [],
    generalHarm: 0,
    sexualHarm: 0,
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  const classes = useStyles();
  const newLineChars = post.caption.match(/\n/g) || [];
  return (
    <Paper>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          תגובה
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.caption}>
          <HtmlWithNewLines text={post.caption} />
        </Typography>
        <TextField
          id="quotesAndWords"
          label={strings.commentForm.quotes}
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          value={formik.values.quotesAndWords}
          onChange={formik.handleChange}
          error={
            formik.touched.quotesAndWords &&
            Boolean(formik.errors.quotesAndWords)
          }
          helperText={
            formik.touched.quotesAndWords && formik.errors.quotesAndWords
          }
        />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            {strings.commentForm.reportReason}
          </FormLabel>
          <FormGroup>
            {reportReasons.map((reason) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={`${reason.category}-${reason.key}`}
                    onChange={(event) => {
                      const newValue = formik.values.reportReasons;
                      if (event.target.checked) {
                        newValue.push(reason.key);
                      } else {
                        const i = newValue.indexOf(reason.key);
                        newValue.splice(i, 1);
                      }
                      return formik.setFieldValue("reportReasons", newValue);
                    }}
                    checked={formik.values.reportReasons.includes(reason.key)}
                  />
                }
                label={reason.value}
              />
            ))}
          </FormGroup>
        </FormControl>
        <TextField
          id="otherComments"
          label={strings.commentForm.otherComments}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={formik.values.otherComments}
          onChange={formik.handleChange}
          error={
            formik.touched.quotesAndWords &&
            Boolean(formik.errors.quotesAndWords)
          }
          helperText={
            formik.touched.otherComments && formik.errors.otherComments
          }
        />
        <CustomRating
          label={strings.commentForm.generalHarm}
          onChange={(e: any, v: number) =>
            formik.setFieldValue("generalHarm", v)
          }
          value={formik.values.generalHarm}
        />
        <CustomRating
          label={strings.commentForm.sexualHarm}
          onChange={(e: any, v: number) =>
            formik.setFieldValue("sexualHarm", v)
          }
          value={formik.values.sexualHarm}
          error={formik.touched.sexualHarm && formik.errors.sexualHarm}
        />
        <Button variant="contained" color="primary" type="submit">
          {strings.submit}
        </Button>
        <Button variant="contained" color="secondary" onClick={onSkip}>
          {strings.skip}
        </Button>
      </form>
    </Paper>
  );
};

export default CommentForm;
