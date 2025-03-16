import axios from "axios";
import Cookies from "js-cookie";

const handleUnauthorized = () => {
  Cookies.remove("token");

  window.location.href = "/login";
};

const request = {
  get(headers, url, params) {
    const configOptions = {
      params,
      headers,
      validateStatus(status) {
        return status <= 500;
      },
    };

    return axios
      .get(url, configOptions)
      .then((response) => {
        if (
          response.status === 401 ||
          response.data?.message?.toLowerCase().includes("invalid token") ||
          response.data?.message?.toLowerCase().includes("invalid access token")
        ) {
          handleUnauthorized();
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        if (
          error.response?.status === 401 ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid token") ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid access token")
        ) {
          handleUnauthorized();
        }
        return Promise.reject(error);
      });
  },

  post(headers, url, params, queryParams) {
    const configOptions = {
      headers,
      validateStatus(status) {
        return status <= 500;
      },
    };

    let updatedUrl = url;
    if (queryParams) {
      const queryArr = [];
      Object.keys(queryParams).forEach((queryKey) => {
        queryArr.push(`${queryKey}=${queryParams[queryKey]}`);
      });
      const queryString = queryArr.join("&");
      updatedUrl = `${url}?${queryString}`;
    }

    return axios
      .post(updatedUrl, params, configOptions)
      .then((response) => {
        if (
          response.status === 401 ||
          response.data?.message?.toLowerCase().includes("invalid token") ||
          response.data?.message?.toLowerCase().includes("invalid access token")
        ) {
          handleUnauthorized();
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        if (
          error.response?.status === 401 ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid token") ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid access token")
        ) {
          handleUnauthorized();
        }
        return Promise.reject(error);
      });
  },

  put(headers, url, params) {
    const configOptions = {
      headers,
      validateStatus(status) {
        return status <= 500;
      },
    };

    return axios
      .put(url, params, configOptions)
      .then((response) => {
        if (
          response.status === 401 ||
          response.data?.message?.toLowerCase().includes("invalid token") ||
          response.data?.message?.toLowerCase().includes("invalid access token")
        ) {
          handleUnauthorized();
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        if (
          error.response?.status === 401 ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid token") ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid access token")
        ) {
          handleUnauthorized();
        }
        return Promise.reject(error);
      });
  },

  patch(headers, url, params) {
    const configOptions = {
      headers,
      validateStatus(status) {
        return status <= 500;
      },
    };

    return axios
      .patch(url, params, configOptions)
      .then((response) => {
        if (
          response.status === 401 ||
          response.data?.message?.toLowerCase().includes("invalid token") ||
          response.data?.message?.toLowerCase().includes("invalid access token")
        ) {
          handleUnauthorized();
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        if (
          error.response?.status === 401 ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid token") ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid access token")
        ) {
          handleUnauthorized();
        }
        return Promise.reject(error);
      });
  },

  delete(headers, url, data) {
    const configOptions = {
      data,
      headers,
      validateStatus(status) {
        return status <= 500;
      },
    };

    return axios
      .delete(url, configOptions)
      .then((response) => {
        if (
          response.status === 401 ||
          response.data?.message?.toLowerCase().includes("invalid token") ||
          response.data?.message?.toLowerCase().includes("invalid access token")
        ) {
          handleUnauthorized();
          return Promise.reject(response);
        }
        return response;
      })
      .catch((error) => {
        if (
          error.response?.status === 401 ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid token") ||
          error.response?.data?.message
            ?.toLowerCase()
            .includes("invalid access token")
        ) {
          handleUnauthorized();
        }
        return Promise.reject(error);
      });
  },
};

const wrapAnonymous =
  (method) =>
  async (customHeaders = {}, replaceHeaders = false, ...props) => {
    let headers = {
      // you can add any global headers here
      ...customHeaders,
    };
    if (replaceHeaders) headers = customHeaders;

    return request[method](headers, ...props);
  };

const wrapAuth =
  (method) =>
  async (customHeaders = {}, replaceHeaders = false, ...props) => {
    const userToken = Cookies.get("token");

    let headers = {
      Authorization: `Bearer ${userToken}`,
      ...customHeaders,
    };
    if (replaceHeaders) headers = customHeaders;

    return request[method](headers, ...props);
  };

export const anonymousRequests = {
  get: wrapAnonymous("get"),
  post: wrapAnonymous("post"),
  put: wrapAnonymous("put"),
};

export const authRequests = {
  get: wrapAuth("get"),
  post: wrapAuth("post"),
  put: wrapAuth("put"),
  patch: wrapAuth("patch"),
  delete: wrapAuth("delete"),
};
