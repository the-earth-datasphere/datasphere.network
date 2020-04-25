# The Earth Datasphere - EarthxHack 2020 Hackathon

The Earth Datasphere makes it easy to share data across a network of peers, everyone has the same view of the same data and integration costs for anyone joining the network are practically nil. Anyone can join and leave the network at will and decide how much data they share (via API interface) and what they do with the data they receive from peers.

## Install

To run the project you will need to clone this repository and install RabbitMQ.

### Clone repository
```git clone https://github.com/the-earth-datasphere/datasphere.network.git```

### RabbitMQ
```docker pull rabbitmq```

## Start 

In a production environment you will always have one RabbitMQ instance and one Datasphere Server Node but for demo purposes they are all going to run on the same machine.

### RabbitMQ
You can start one or multiple RabbitMQ instances but remember to change the ports (5672 for MQ listener and 15672 HTTP API Port) for each instance. For this demo, only one RabbitMQ instance is used. To use multiple instances, update for each server the URI to the AMQP port listener (for example ```amqp://guest:guest@localhost:5672```) in the constants.js file and in the npm run dev commands.

#### Default
```docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management```

#### Example for ports 5673 and 15673
```docker run -it --rm --name rabbitmq2 -p 5673:5672 -p 15673:15672 rabbitmq:3-management```

#### The Earth Datasphere 
After you've started Rabbit MQ, the default command for starting a Datasphere node (P2P port 5001 and HTTP port 3001) is:
```npm run dev```


To start new nodes (with one RabbitMQ instance): 

```set P2P_PORT=5002&&set HTTP_PORT=3002&&set PEERS=ws://localhost:5001&&set DATASTORE_QUEUE=TD.DATASTORE&&set BROADCAST_QUEUE=TD.BROADCAST&&set SERVER_NAME=SERVER.2&& npm run dev```
```set P2P_PORT=5003&&set HTTP_PORT=3003&&set PEERS=ws://localhost:5001,ws://localhost:5002&&set DATASTORE_QUEUE=TD.DATASTORE&&set BROADCAST_QUEUE=TD.BROADCAST&&set SERVER_NAME=SERVER.3&& npm run dev```

... and so on.

## Test
