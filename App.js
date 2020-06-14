const rp = require("request-promise");

const checkServer = async (server) => {
  let status;
  try {
    // get request to the url
    const res = await rp({ uri: server.url, timeout: 5000, resolveWithFullResponse: true });
    status = res.statusCode;
  } catch (error) {
    status = error.statusCode || error.code || error.message;
  }
  // return new object with previous key-value and their status
  return { ...server, status };
};

const findServer = (serverList) => {
  // checking if parameter is undefined and throwing error
  if (!serverList) {
    throw new Error("serverList is missing");
  }
  return new Promise((resolve, reject) => {
    Promise.all(serverList.map((server) => checkServer(server))).then((result) => {
      // filtering all the objects which have status code between 200-300
      let onlineServers = result.filter(
        (server) => typeof server.status === "number" && server.status >= 200 && server.status < 300
      );

      // checking if no object is there then reject error,
      // else sort the filtered result in ascending order and resolve the first element.
      if (onlineServers.length === 0) {
        reject("No online servers found");
      } else {
        onlineServers = onlineServers.sort((a, b) => a.priority - b.priority);
        onlineServers = onlineServers[0];
      }
      resolve(onlineServers);
    });
  });
};

module.exports = { findServer };
