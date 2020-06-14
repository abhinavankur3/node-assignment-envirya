const { expect } = require("chai");
const { describe } = require("mocha");
const { findServer } = require("../App");

describe("Online server with lowest priority number - test cases", () => {
  it("Only one online server", async () => {
    const serverList = [
      {
        url: "http://doesNotExist.boldtech.co",
        priority: 1,
      },
      {
        url: "http://boldtech.co",
        priority: 7,
      },
      {
        url: "http://offline.boldtech.co",
        priority: 2,
      },
      {
        url: "http://google.com",
        priority: 4,
      },
    ];
    const result = await findServer(serverList);
    expect(result.status).to.equal(200);
    expect(result.url).to.equal("http://google.com");
    expect(result.priority).to.equal(4);
  });
  it("More than one online server", async () => {
    const serverList = [
      {
        url: "http://doesNotExist.boldtech.co",
        priority: 1,
      },
      {
        url: "http://boldtech.co",
        priority: 7,
      },
      {
        url: "http://offline.boldtech.co",
        priority: 2,
      },
      {
        url: "http://google.com",
        priority: 4,
      },
      {
        url: "https://example.com/",
        priority: 5,
      },
      {
        url: "https://envirya.in/",
        priority: 3,
      },
    ];
    const result = await findServer(serverList);
    expect(result.status).to.equal(200);
    expect(result.url).to.equal("https://envirya.in/");
    expect(result.priority).to.equal(3);
  });
  it("No online server", async () => {
    const serverList = [
      {
        url: "http://doesNotExist.boldtech.co",
        priority: 1,
      },
      {
        url: "http://boldtech.co",
        priority: 7,
      },
      {
        url: "http://offline.boldtech.co",
        priority: 2,
      },
    ];
    try {
      await findServer(serverList);
    } catch (error) {
      expect(error).to.equal("No online servers found");
    }
  });
});
