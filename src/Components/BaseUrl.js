import axios from "axios";

// Set config defaults when creating the instance
const BaseUrl = axios.create({
  baseURL: "http://api.miftaahportal.org/",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default BaseUrl;