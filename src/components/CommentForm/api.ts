import { DbString } from "./types";
import axios from "axios";

async function getStringFromCategory(category: string): Promise<DbString[]> {
  return axios.get(
    `${process.env.REACT_APP_API_HOST}/string?category=reportReason`
  ).then(res => res.data);
}

export default {
  getStringFromCategory: getStringFromCategory,
};
