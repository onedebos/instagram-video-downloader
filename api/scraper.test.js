const app = require("./scraper");
const supertest = require("supertest");
const api = supertest(app);

describe("getting video urls from instagram pages", () => {
  test("a url with the correct link returns an mp4 video link", async () => {
    const pageUrl = {
      url:
        "https://www.instagram.com/p/CA5CsiZJMEJ/?utm_source=ig_web_copy_link"
    };

    const result = await api
      .post("/api/download")
      .send(pageUrl)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(result.body.downloadLink).toContain("mp4");
  });

  test("an incorrect URL responsds with an error message", async () => {
    const pageUrl = {
      url: "https://www.instagram.com/"
    };

    const result = await api
      .post("/api/download")
      .send(pageUrl)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(result.body.error).toBe("The link you have entered is invalid. ");
  });
}, 10000);
