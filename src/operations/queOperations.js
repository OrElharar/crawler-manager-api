const { urlLinksListKey } = require("../db/dbKeys");
const redisClient = require("../db/redis");

const getQueByCurrentDepth = async (depth, firstId, totalNumberOfUrls, crawlerId) => {
    const firstIndex = parseInt(firstId);
    const totaNumberOflLinks = parseInt(totalNumberOfUrls)
    let que = [];
    for (let i = firstIndex; i < totaNumberOflLinks + firstIndex; i++) {
        const key = `${crawlerId}:${depth}:${urlLinksListKey}:${i}`;
        const urlLinks = await redisClient.lrangeAsync(key, 0, -1);
        que = que.concat(urlLinks)
    }
    return que;
}



module.exports = { getQueByCurrentDepth }