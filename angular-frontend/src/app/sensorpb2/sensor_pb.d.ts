// package: sensors
// file: sensor.proto

import * as jspb from "google-protobuf";

export class SensorRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SensorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SensorRequest): SensorRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SensorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SensorRequest;
  static deserializeBinaryFromReader(message: SensorRequest, reader: jspb.BinaryReader): SensorRequest;
}

export namespace SensorRequest {
  export type AsObject = {
  }
}

export class SensorResponse extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SensorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SensorResponse): SensorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SensorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SensorResponse;
  static deserializeBinaryFromReader(message: SensorResponse, reader: jspb.BinaryReader): SensorResponse;
}

export namespace SensorResponse {
  export type AsObject = {
    value: number,
  }
}

