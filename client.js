import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(process.cwd(), 'simple.proto');

// Cargar el archivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const simpleProto = grpc.loadPackageDefinition(packageDefinition).SimpleService;

// Creo un cliente gRPC
const client = new simpleProto('localhost:50051', grpc.credentials.createInsecure());

// Llammo  a la funcion que suma... los numeros aqui estan hardcodeados...
client.Add({ number1: 14, number2: 16 }, (error, response) => {
  if (!error) {
    console.log('Resultado:', response.result);
  } else {
    console.error('Error:', error);
  }
});

