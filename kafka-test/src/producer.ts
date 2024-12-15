import { kafka } from "./client";
import readLine from "readline";

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})
const data = JSON.stringify({
    id: '123',
    title: 'MCC Panel',
    price: 2154
});

const producer = kafka.producer();
producer.connect();

producer.on('producer.connect', async() => {
    console.log('Producer Connected!');
    await producer.send({
        topic: 'panel-created',
        messages: [
            {
                partition: 0,
                key: "panel-updated",
                value: data
            }
        ]
    })

})

// async function init() {
//     const producer = kafka.producer();

//     console.log('Connecting Producer....');
//     await producer.connect();
//     console.log('Producer Connected!');

//     rl.setPrompt('>');
//     rl.prompt();

//     rl.on('line', async(line) => {
//         const [title, price] = line.split(' ');
//         await producer.send({
//             topic: 'panel-created',
//             messages: [
//                 {
//                     partition: title === 'MCC' ? 0 : 1,
//                     key: "panel-updated",
//                     value: JSON.stringify({title: title, price: price})
//                 }
//             ]
//         });
//     }).on('close',async () => {
//         await producer.disconnect();
//         console.log('Producer disconneceted!') 
//     });
// }
//  init();
