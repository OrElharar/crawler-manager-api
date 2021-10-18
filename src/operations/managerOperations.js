const { crawlersCounter, crawlerPartialKey } = require("../db/dbKeys");
const redisClient = require("../db/redis");

const createNewManager = async (startUrl, maxDepth, maxNumberOfPages) => {
    const numberOfCrawlers = await getNumberOfCrawlers();
    const id = numberOfCrawlers + 1
    const key = crawlerPartialKey + ":" + id;
    const hash = {
        id,
        startUrl,
        maxDepth,
        maxNumberOfPages,
        currentDepth: 1,
        currentDepthNumberOfUrls: 1,
        currentDepthScannedUrls: 0,
        currentDepthFirstUrlId: 1,
        totalNumberOfScannedUrls: 0
    }
    return { key, hash }
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



const getNumberOfCrawlers = async () => {
    try {
        const numberOfCrawlers = await redisClient.getAsync(crawlersCounter);
        if (numberOfCrawlers == null) {
            return 0;
        }
        return parseInt(numberOfCrawlers);

    } catch (err) {
        return ({
            staus: 500,
            message: err.message
        });
    }
}

module.exports = {
    createNewManager,
    isCurrentCrawlerScanFinished,
    isCurrentDepthScanFinished,
}