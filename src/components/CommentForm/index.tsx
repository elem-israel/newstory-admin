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
import CustomRating from "./CustomRating"
import api from "./api";
import { DbString } from "./types";

interface CommentFormProps {}

const comment = `כמה מילים עם מעבר שורה
אחד כדי לראות את האפקט`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));


const reportReasons: Array<string> = [
  "תמונה עם צבעים קודרים",
  "תוכן בנושא זנות",
  "תוכן בנושא אובדנות",
  "תוכן בנושא הפרעות אכילה",
  "תוכן בנושא דימוי גוף",
  "תוכן בנושא פגיעה עצמית",
  "תוכן בנושא התמכרויות",
  "מילה מעוררת חשד",
];

interface FormValues {
  quotesAndWords: string | null;
  otherComments: string | null;
  reportReasons: string[];
  generalHarm: number;
  sexualHarm: number;
}

const CommentForm: FunctionComponent<CommentFormProps> = () => {
  const [reportReasons, setReportReasons] = useState<DbString[]>([]);

  useEffect(() => {
    reportReasons.length == 0 &&
      api
        .getStringFromCategory("reportReason")
        .then((res) => setReportReasons(res));
  });
  const initialValues: FormValues = {
    quotesAndWords: null,
    otherComments: null,
    reportReasons: [],
    generalHarm: 0,
    sexualHarm: 0,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const classes = useStyles();
  return (
    <Paper>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          תגובה
        </Typography>
        <Typography variant="body1" gutterBottom>
          {comment.split("\n").map(function (item, key) {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </Typography>
        <TextField
          id="outlined-multiline-static"
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
          id="other-comments"
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
          name="general-harm"
          onChange={(e: any, v: number) =>
            formik.setFieldValue("generalHarm", v)
          }
          value={formik.values.generalHarm}
        />
        <CustomRating
          label={strings.commentForm.sexualHarm}
          name="sexual-harm"
          onChange={(e: any, v: number) =>
            formik.setFieldValue("sexualHarm", v)
          }
          value={formik.values.sexualHarm}
        />
        <Button variant="contained" color="primary">
          {strings.submit}
        </Button>
        <Button variant="contained" color="secondary">
          {strings.skip}
        </Button>
      </form>
    </Paper>
  );
};

export default CommentForm;
