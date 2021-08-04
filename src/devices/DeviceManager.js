import Device from './Device.js';
import CurtainActionHandler from './handlers/CurtainActionHandler.js';
import FireSensorActionHandler from './handlers/FireSensorActionHandler.js';
import LightActionHandler from './handlers/LightActionHandler.js';
import LockActionHandler from './handlers/LockActionHandler.js';
import OutletActionHandler from './handlers/OutletActionHandler.js';
import TemperatureSensorActionHandler from './handlers/TemperatureSensorActionHandler.js';

const DeviceManager = {
  _deviceStore: [],

  _handlerMap: {
    light: LightActionHandler,
    temperature: TemperatureSensorActionHandler,
    curtain: CurtainActionHandler,
    outlet: OutletActionHandler,
    fire: FireSensorActionHandler,
    lock: LockActionHandler,
  },

  /**
   * Creates and saves a new device
   *
   * @returns the newly created device
   */
  createDevice({
    deviceType,
    deviceDescription,
    deviceRoom,
  }) {
    if (typeof this._handlerMap[deviceType] !== 'function') {
      throw Error('Device type does not exist');
    }

    const newDevice = new Device({
      type: deviceType,
      description: deviceDescription,
      room: deviceRoom,
      actionHandler: new this._handlerMap[deviceType](),
    });

    this._deviceStore.push(newDevice);

    return newDevice;
  },

  /**
   * Generates a list of saved devices. Doesn't return their action handlers
   *
   * @returns an array with all registered devices
   */
  getDeviceList() {
    const deviceList = this._deviceStore.map((device) => ({
      id: device.id,
      type: device.type,
      description: device.description,
      room: device.room,
    }));

    return deviceList;
  },

  /*
   * Saves a communication event name provided by the management server to an existing device
   */
  registerDeviceCommunication({
    deviceId,
    communicationEvent,
  }) {
    const existingDevice = this._deviceStore.find(
      (device) => device.id === deviceId,
    );

    if (existingDevice) {
      existingDevice.communicationEvent = communicationEvent;
    }
  },

  getDevicesByType(deviceType) {
    return this._deviceStore.filter(
      (device) => device.type === deviceType,
    );
  },
};

export default DeviceManager;
