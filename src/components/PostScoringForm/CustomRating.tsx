import { Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import ErrorIcon from "@material-ui/icons/Error";
import "react";

function CustomRating({ label, ...props }: any) {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Typography component="legend">{label}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Rating max={10} icon={<ErrorIcon fontSize="inherit" />} {...props} />
      </Grid>
      <Grid item>{props.value !== null && props.value}</Grid>
    </Grid>
  );
}

export default CustomRating;