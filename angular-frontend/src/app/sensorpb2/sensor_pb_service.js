// package: sensors
// file: sensor.proto

var sensor_pb = require("./sensor_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Sensor = (function () {
  function Sensor() {}
  Sensor.serviceName = "sensors.Sensor";
  return Sensor;
}());

Sensor.TempSensor = {
  methodName: "TempSensor",
  service: Sensor,
  requestStream: false,
  responseStream: true,
  requestType: sensor_pb.SensorRequest,
  responseType: sensor_pb.SensorResponse
};

Sensor.HumiditySensor = {
  methodName: "HumiditySensor",
  service: Sensor,
  requestStream: false,
  responseStream: true,
  requestType: sensor_pb.SensorRequest,
  responseType: sensor_pb.SensorResponse
};

exports.Sensor = Sensor;

function SensorClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SensorClient.prototype.tempSensor = function tempSensor(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Sensor.TempSensor, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

SensorClient.prototype.humiditySensor = function humiditySensor(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Sensor.HumiditySensor, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.SensorClient = SensorClient;

