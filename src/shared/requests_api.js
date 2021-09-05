const baseUrl =
  process.env.REACT_APP_API_HOST +
  (process.env.REACT_APP_DEV_API ? "/demo" : "");

const postReport = (username, token, body) =>
  new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
    };
    var id = 1;
    if (body.id) {
      id = body.id[0] > body.id[1] ? body.id[1] : body.id[0];
    }
    body.username = undefined;
    body.createdAt = undefined;
    body.text = undefined;
    body.varient = undefined;
    body.id = undefined;
    body.auther = username;

    console.log(JSON.stringify(body));
    var url = new URL(`${baseUrl}/post/${id}/report`);
    fetch(url, {
      headers: headers,
      body: JSON.stringify(body),
      method: "POST",
      mode: "no-cors",
    })
      .then((response) => {
        if (response.status != 200) {
          response.text().then((data) => console.log(data));
          reject(response);
        }
        return response.text();
      })
      .then((data) => resolve(data))
      .catch((e) => reject(e));
  });

const getRandomPost = (token) =>
  new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    var url = new URL(`${baseUrl}/post/random`),
      params = { n: 1 };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      headers: headers,
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (response.status != 200) {
          response.text().then((data) => console.log(data));
          reject(response);
        }
        return response.json();
      })
      .then((data) => resolve(data[0]))
      .catch((e) => {
        reject(e);
      });
  });

export { getRandomPost, postReport };
