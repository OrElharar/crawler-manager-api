const { crawlersCounter, crawlerPartialKey, urlObjPartialKey } = require("../db/dbKeys");
const redisClient = require("../db/redis");

const createAndSaveRootPage = (url) => {
    const id = 1;
    const crawlerId = 1;
    const urlDepth = 1;
    const parentId = 0;
    // const key = `${crawlerId}:${urlDepth}:${id}:${urlObjPartialKey}`;
    // await redisClient.setAsync(key, url);
    return { urlDepth, crawlerId, id, url, parentId }
}

const createAndSaveNewCrawler = async (startUrl, maxDepth, maxNumberOfPages) => {
    try {
        const id = await generateNewId();

        const data = {
            id,
            startUrl,
            maxDepth,
            maxNumberOfPages,
            nextDepthLvlToSend: 1,
            currentDepth: 1,
            currentDepthTotalNumberOfUrls: 1,
            currentDepthScannedUrls: 0,
            currentDepthFirstUrlId: 1,
            currentDepthDeadEnds: 0,
            totalNumberOfScannedUrls: 0
        }
        await saveCrawler(data, id)
        return data
    } catch (err) {
        console.log(err);
    }

    return { key, hash }
}


const saveCrawler = async (data, id) => {
    const hashKey = `crawler:${id}`;
    const hashArray = [];
    for (let [key, value] of Object.entries(data)) {
        hashArray.push(key);
        hashArray.push(value)
    }

    await redisClient.hmset(hashKey, hashArray);
}
const isCurrentCrawlerScanFinished = (crawler) => {
    return (
        crawler.totalNumberOfScannedUrls === crawler.maxNumberOfPages ||
        crawler.currentDepth === crawler.maxDepth ||
        crawler.currentDepth === crawler.maxDepth ||
        crawler.currentDepthNumberOfChildLinks === 0
    )
}



const isCurrentDepthScanFinished = (crawler) => {
    return (crawler.currentDepthTotalNumberOfUrls === crawler.currentDepthScannedUrls)
}



const generateNewId = async () => {
    try {
        const crawlers = await redisClient.keysAsync("crawler:*")
        return crawlers.length + 1

    } catch (err) {
        return ({
            staus: 500,
            message: err.message
        });
    }
}

module.exports = {
    createAndSaveNewCrawler,
    isCurrentCrawlerScanFinished,
    isCurrentDepthScanFinished,
    createAndSaveRootPage
}