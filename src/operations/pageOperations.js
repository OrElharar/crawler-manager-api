const redisClient = require("../db/redis");
const { urlObjPartialKey } = require("../db/dbKeys");

const createNewPage = async (crawler, page) => {
    const id = page.id;
    const key = `${crawler.id}:${crawler.depth}:${urlObjPartialKey}:${id}`;
    const hash = {
        id,
        title: page.title,
        url: page.url,
        parentUrl: page.parentUrl
    }
    return { key, hash }
}



module.exports = { createNewPage }