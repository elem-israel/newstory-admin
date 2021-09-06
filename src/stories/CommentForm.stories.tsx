import React from "react";
import { Meta } from "@storybook/react";
import CommentForm from "../components/CommentForm";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";

const meta: Meta = {
  component: CommentForm,
  title: "Components/CommentForm",
};

export default meta;

export const Example: React.VFC<{}> = () => (
  <div dir="rtl">
    <ThemeProvider theme={theme}>
      <CommentForm />
    </ThemeProvider>
  </div>
);
