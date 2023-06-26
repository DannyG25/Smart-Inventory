/**
 * @fileoverview gRPC-Web generated client stub for sensors
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.12.4
// source: sensor.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.sensors = require('./sensor_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.sensors.SensorClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.sensors.SensorPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sensors.SensorRequest,
 *   !proto.sensors.SensorResponse>}
 */
const methodDescriptor_Sensor_TempSensor = new grpc.web.MethodDescriptor(
  '/sensors.Sensor/TempSensor',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sensors.SensorRequest,
  proto.sensors.SensorResponse,
  /**
   * @param {!proto.sensors.SensorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sensors.SensorResponse.deserializeBinary
);


/**
 * @param {!proto.sensors.SensorRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sensors.SensorResponse>}
 *     The XHR Node Readable Stream
 */
proto.sensors.SensorClient.prototype.tempSensor =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sensors.Sensor/TempSensor',
      request,
      metadata || {},
      methodDescriptor_Sensor_TempSensor);
};


/**
 * @param {!proto.sensors.SensorRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sensors.SensorResponse>}
 *     The XHR Node Readable Stream
 */
proto.sensors.SensorPromiseClient.prototype.tempSensor =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sensors.Sensor/TempSensor',
      request,
      metadata || {},
      methodDescriptor_Sensor_TempSensor);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sensors.SensorRequest,
 *   !proto.sensors.SensorResponse>}
 */
const methodDescriptor_Sensor_HumiditySensor = new grpc.web.MethodDescriptor(
  '/sensors.Sensor/HumiditySensor',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sensors.SensorRequest,
  proto.sensors.SensorResponse,
  /**
   * @param {!proto.sensors.SensorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sensors.SensorResponse.deserializeBinary
);


/**
 * @param {!proto.sensors.SensorRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sensors.SensorResponse>}
 *     The XHR Node Readable Stream
 */
proto.sensors.SensorClient.prototype.humiditySensor =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sensors.Sensor/HumiditySensor',
      request,
      metadata || {},
      methodDescriptor_Sensor_HumiditySensor);
};


/**
 * @param {!proto.sensors.SensorRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sensors.SensorResponse>}
 *     The XHR Node Readable Stream
 */
proto.sensors.SensorPromiseClient.prototype.humiditySensor =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sensors.Sensor/HumiditySensor',
      request,
      metadata || {},
      methodDescriptor_Sensor_HumiditySensor);
};


module.exports = proto.sensors;

