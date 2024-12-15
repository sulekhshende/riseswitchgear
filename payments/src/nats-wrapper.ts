import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
    private _client?: Stan;

    get client(){
        if(!this._client){
            throw new Error('cannot access Nats-Client before Connecting!');
        };

        return this._client;
    }

    connect(clientId:string, clusterId:string, url:string){
        this._client = nats.connect(clientId, clusterId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client!.on('connect', () => {
              console.log('Connected to NATS');
              resolve();
            });
            this.client!.on('error', (err) => {
                reject(err)
            })
        });
    };
};

export const natsWrapper = new NatsWrapper();