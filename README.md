# The Earth Datasphere - EarthxHack 2020 Hackathon

The Earth Datasphere makes it easy to share data across a network of peers, everyone has the same view of the same data and integration costs for anyone joining the network are practically nil. Anyone can join and leave the network at will and decide how much data they share (via API interface) and what they do with the data they receive from peers.

## Install

To run the project you will need to clone this repository and install RabbitMQ.

### Clone repository
```git clone https://github.com/the-earth-datasphere/datasphere.network.git```

### RabbitMQ
```docker pull rabbitmq```

## Start 

### RabbitMQ
You can start one or multiple RabbitMQ instances, remember to change the ports (5672 for MQ listener and 15672 HTTP API Port). For this demo, only one RabbitMQ instance is used. To use multiple instances, update for each server the URI to the AMQP port listener (for example amqp://guest:guest@localhost:5672) in the constants.js file and in the npm run dev commands.

#### Default
```docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management```

#### Ports 5673 and 15673
```docker run -it --rm --name rabbitmq2 -p 5673:5672 -p 15673:15672 rabbitmq:3-management```