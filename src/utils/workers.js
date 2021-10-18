const workersUrls = ["http://localhost:5001", "http://localhost:5002"]
const Axios = require("axios");

const postQueueUrlToWorkers = async (queueUrl) => {
    const sendQueueUrlsToWorkers = workersUrls.map((workerUrls) => (
        Axios.post(workerUrls + "/set-queue", {
            data: { queueUrl }
        })
    ))
    try {
        await Promise.allSettled(sendQueueUrlsToWorkers)
    } catch (err) {
        console.log({ err });
    }
}

module.exports({
    postQueueUrlToWorkers
})