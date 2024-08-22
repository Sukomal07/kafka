import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: "my-app3" })

async function main() {

    //producing
    await producer.connect()

    await producer.send({
        topic: "quickstart-events",
        messages: [{
            value: "hi there , message from kafka"
        }]
    })

    //consuming
    await consumer.connect()

    await consumer.subscribe({
        topic: "quickstart-events",
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message?.value?.toString()
            })
        }
    })
}

main().catch(console.error) 
