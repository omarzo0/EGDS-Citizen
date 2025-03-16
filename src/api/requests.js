import { anonymousRequests, authRequests } from "./request";
import Urls from "./urls";

const { post: postAnonymous, get: getAnonymous } = anonymousRequests;
const {
  get: getAuth,
  post: postAuth,
  delete: deleteAuth,
  put: putAuth,
} = authRequests;
