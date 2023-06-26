// package: sensors
// file: sensor.proto

import * as sensor_pb from "./sensor_pb";
import {grpc} from "@improbable-eng/grpc-web";

type SensorTempSensor = {
  readonly methodName: string;
  readonly service: typeof Sensor;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof sensor_pb.SensorRequest;
  readonly responseType: typeof sensor_pb.SensorResponse;
};

type SensorHumiditySensor = {
  readonly methodName: string;
  readonly service: typeof Sensor;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof sensor_pb.SensorRequest;
  readonly responseType: typeof sensor_pb.SensorResponse;
};

export class Sensor {
  static readonly serviceName: string;
  static readonly TempSensor: SensorTempSensor;
  static readonly HumiditySensor: SensorHumiditySensor;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class SensorClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  tempSensor(requestMessage: sensor_pb.SensorRequest, metadata?: grpc.Metadata): ResponseStream<sensor_pb.SensorResponse>;
  humiditySensor(requestMessage: sensor_pb.SensorRequest, metadata?: grpc.Metadata): ResponseStream<sensor_pb.SensorResponse>;
}

