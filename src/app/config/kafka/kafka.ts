import {Kafka, logLevel} from 'kafkajs';
import dotenv from 'dotenv';
import {v4 as uuid} from 'uuid';

dotenv.config();

const brokers = process.env.KAFKA_BOOTSTRAP_SERVERS
  ? process.env.KAFKA_BOOTSTRAP_SERVERS.split(',')
  : ['localhost:9092'];

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers,
  clientId: `moservice-${uuid()}`,
});

const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionalId: `mos-content-service-${uuid()}`,
});

const consumer = kafka.consumer({groupId: 'mos-group'});

export {producer, consumer};
