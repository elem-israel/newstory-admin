import axios from "axios";

async function getStringFromCategory(category: string): Promise<DbString[]> {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/string`, {
      params: { category: "reportReason" },
    })
    .then((res) => res.data);
}

async function getRandomPosts(n: number): Promise<Post[]> {
  return axios
    .get(`${process.env.REACT_APP_API_HOST}/post/random`, { params: { n } })
    .then((res) => res.data);
}

export default {
  getStringFromCategory,
  getRandomPosts,
};
