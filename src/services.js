import axios from "axios";
const server = "http://localhost:3001/api/download";

const getVideoDownloadUrl = async url => {
  const response = await axios.post(server, { url: url });
  return response.data;
};

export default {
  getVideoDownloadUrl: getVideoDownloadUrl
};
