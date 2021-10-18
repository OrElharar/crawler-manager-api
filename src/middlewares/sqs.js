const AWS = require("aws-sdk");

const sqs = new AWS.SQS({
    apiVersion: "2012-11-05",
    region: process.env.AWS_REGION
})

const createQueue = async (req, res, next) => {
    // const QueueName = "crawler" + new Date().getTime();
    const QueueName = req.body.queueName;
    try {
        const data = await sqs.createQueue({
            QueueName

        }).promise();
        req.queueUrl = data.QueueUrl;
        next();
    } catch (err) {
        res.status(400).send({
            status: 400,
            error: err.message
        })
    }
}

const createFifoQueue = async (req, res, next) => {
    const QueueName = req.body.queueName //crawler-queue.fifo;
    try {
        const data = await sqs.createQueue({
            QueueName,
            Attributes: {
                "FifoQueue": "true",
                "ContentBasedDeduplication": "true"
            }

        }).promise();
        req.queueUrl = data.QueueUrl;
        next();
    } catch (err) {
        res.status(400).send({
            status: 400,
            error: err.message
        })
    }
}

module.exports = {
    createQueue
}