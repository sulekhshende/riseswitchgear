import { EachMessagePayload } from "kafkajs";
import { kafka } from "./client";

const group = 'panel-service-queue-group';

const consume = kafka.consumer({ groupId:group });
consume.connect();

consume.on('consumer.connect', async() => {
    console.log('consumer Connected!');
    await consume.subscribe({ topics: ['panel-created'], fromBeginning: true })

    await consume.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }:EachMessagePayload) => {
            console.log(`${group} :[${topic}]: Partition: ${partition} : `, message.value?.toString())
        }
        
    });
})


// async function init() {
//     const consumer = kafka.consumer({ groupId:group });

//     console.log('Connecting consumer....');
//     await consumer.connect();
//     console.log('consumer Connected!');

//     await consumer.subscribe({ topics: ['panel-created'], fromBeginning: true })

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
//             console.log(`${group} :[${topic}]: Partition: ${partition} : `, message.value?.toString())
//         }
        
//     });
// }
//  init();

// export interface SimpleConsumer {
//     connect(): Promise<void>;
//     handle(message: any): Promise<void>
//     disconnect(): Promise<void>;
//   }
  
//   export class MyConsumer implements SimpleConsumer {
//     private readonly consumer: Consumer;
  
//     connect(): Promise<void> {
//       return this.consumer.connect()
//         .then(() => this.consumer.subscribe({ topic: this.config.topic }))
//         .then(() => this.consumer.run({ eachMessage: payload => this.handle(payload) }))
//         .catch(e => console.log(`Can't connect ${e}`));
//     }
    
//     handle({ topic, partition, message }: EachMessagePayload): Promise<void> {
//       // handling of received message
//     }
  
//     disconnect(): Promise<void> {
//       return this.consumer.disconnect()
//         .catch(e => console.log(`Error on disconnect ${e}`));
//     }
//   }
  
