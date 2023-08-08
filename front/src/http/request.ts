import axios, { AxiosResponse } from "axios";

export interface ResponseData<T extends object> {
  code: number;
  message: string;
  data: T;
}

const request = axios.create({
  baseURL: "https://0xread.me/api",
  timeout: 6000,
  headers: { "Content-Type": "application/json" },
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * get
 * @method get
 * @param {url, params, loading}
 */
const get = function (url: string, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    request
      .get(url, { params: data, ...config })
      .then((res: AxiosResponse) => {
        if (res.data.code !== 0) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**
 * post
 * @method post
 * @param {url, params}
 */
const post = function (url: string, data = {}) {
  return new Promise((resolve, reject) => {
    request
      .post(url, data)
      .then((res) => {
        if (res.data.code !== 0) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * put
 * @method put
 * @param {url, params}
 */
const put = function (url: string, data = {}) {
  return new Promise((resolve, reject) => {
    request
      .put(url, data)
      .then((res) => {
        if (res.data.code !== 0) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * delete
 * @method delete
 * @param {url, params}
 */
const rdelete = function (url: string, data = {}) {
  return new Promise((resolve, reject) => {
    request
      .delete(url, data)
      .then((res) => {
        if (res.data.code !== 0) {
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { get, post, put, delete: rdelete };
