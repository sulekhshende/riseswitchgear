import { Subjects } from "./events/subjects";
import { kafka } from "./client";

async function init(){
    try {
        const admin = kafka.admin();
        console.log('Admin Connecting...')
        await admin.connect();
        console.log('Admin Connected');

        console.log('Creating Topic')
        await admin.createTopics({
            topics: [
               {
                topic: 'panel-created', //Subjects.PanelCreated,
                numPartitions: 2,
               }
            ]
        });
        console.log(`Topic Created [Panel-Created]`)

        await admin.disconnect();
        console.log('Admin Disconnected')
    } catch (err) {
        console.log(err)
    }
};

init();