import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
    clientId: 'riseswitchgear',
    ssl: false,
    brokers: ["localhost:9092"]
});

export {kafka};