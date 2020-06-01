const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const axios = require("axios");
const cheerio = require("cheerio");

const getVideo = async url => {
  const html = await axios.get(url);
  console.log(`html: ${html.data}`);
  const $ = cheerio.load(html.data);
  // console.log(`cheerio: ${$}`);
  const videoString = $("meta[property='og:video']").attr("content");
  console.log(`videoString: ${videoString}`);
  return videoString;
};

app.get("/api/download", (request, response) => {
  response.json({ yes: "it works" });
});

app.post("/api/download", async (request, response) => {
  console.log("request coming in...");

  try {
    const videoLink = await getVideo(request.body.url);
    if (videoLink !== undefined) {
      response.json({ downloadLink: videoLink });
      console.log(`videoLink: ${videoLink}, url: ${request.body.url}`);
    } else {
      response.json({ error: "The link you have entered is invalid. " });
      console.log(`videoLink: ${videoLink}, url: ${request.body.url}`);
    }
  } catch (err) {
    response.json({
      error: "There is a problem with the link you have provided."
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;
