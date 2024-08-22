import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer()

async function run() {
    await producer.connect()

    await producer.send({
        topic: "quickstart-events",
        messages: [
            {
                value: "Send from producer"
            }
        ]
    })
}

run().catch(console.error)