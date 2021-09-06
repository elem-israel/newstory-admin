import React, { FunctionComponent, useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import strings from "./strings.json";
import ErrorIcon from "@material-ui/icons/Error";

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

function CustomRating(props: any) {
  const [value, setValue] = useState(null);
  return (
    <div>
      <Typography component="legend">{props.label}</Typography>
      <Rating
        max={10}
        name={props.name}
        icon={<ErrorIcon fontSize="inherit" />}
        onChange={(event: any, newValue: any) => {
          setValue(newValue);
        }}
      />
      {value !== null && <Box ml={2}>{value}</Box>}
    </div>
  );
}

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

const CommentForm: FunctionComponent<CommentFormProps> = () => {
  const classes = useStyles();
  return (
    <Paper>
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
        label={strings.quotes.title}
        multiline
        rows={4}
        defaultValue="Default Value"
        variant="outlined"
      />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{strings.reportReason.title}</FormLabel>
        <FormGroup>
          {reportReasons.map((label) => (
            <FormControlLabel
              control={<Checkbox name="gilad" />}
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <TextField
        id="outlined-multiline-static"
        label={strings.otherComments.title}
        multiline
        rows={4}
        defaultValue="Default Value"
        variant="outlined"
      />
      <CustomRating label={strings.generalHarm.title} name="general-harm" />
      <CustomRating label={strings.sexualHarm.title} name="sexual-harm"/>
    </Paper>
  );
};

export default CommentForm;