import io from 'socket.io-client';

import { API_URL } from './config/api.js';
import DeviceManager from './devices/DeviceManager.js';

const client = io(API_URL);

/*
 * Register devices (1 of each type)
 */
DeviceManager.createDevice({
  deviceType: 'light',
  deviceDescription: 'Luz Principal',
  deviceRoom: 'Quarto',
});

DeviceManager.createDevice({
  deviceType: 'temperature',
  deviceDescription: 'Ar Condicionado',
  deviceRoom: 'Sala',
});

DeviceManager.createDevice({
  deviceType: 'curtain',
  deviceDescription: 'Cortina Principal',
  deviceRoom: 'Copa',
});

DeviceManager.createDevice({
  deviceType: 'outlet',
  deviceDescription: 'Tomada TV',
  deviceRoom: 'Quarto',
});

DeviceManager.createDevice({
  deviceType: 'fire',
  deviceDescription: 'Sensor Cozinha',
  deviceRoom: 'Cozinha',
});

DeviceManager.createDevice({
  deviceType: 'lock',
  deviceDescription: 'Porta da Sala',
  deviceRoom: 'Sala',
});

/*
 * Connect to the server and register local devices there
 */
client.on('connect', () => {
  client.emit('devices-registration', {
    description: 'Thing Mock Instance',
    deviceList: DeviceManager.getDeviceList(),
  });
});

/*
 * Devices now registered on the server, time to set their
 * events locally
 */
client.on('register', (registeredDevices) => {
  console.log(`::Devices Registered (${registeredDevices.length})`);
  registeredDevices.forEach((registeredDevice) => {
    DeviceManager.registerDeviceCommunication({
      deviceId: registeredDevice.deviceId,
      communicationEvent: registeredDevice.communicationEvent,
    });
  });

  /*
   * Registers events for Lights
   */
  const leds = DeviceManager.getDevicesByType('light');
  leds.forEach((led) => {
    client.on(led.communicationEvent, (message) => {
      led.actionHandler.setState(message.state);
    });
  });

  /*
   * Registers events for temperature sensors
   */
  const tempSensors = DeviceManager.getDevicesByType('temperature');
  tempSensors.forEach((tempSensor) => {
    setInterval(() => {
      const temp = tempSensor.actionHandler.read();
      client.emit(tempSensor.communicationEvent, { temperature: temp });
    }, 5000);
  });

  /*
   * Registers events for curtains
   */
  const curtains = DeviceManager.getDevicesByType('curtain');
  curtains.forEach((curtain) => {
    client.on(curtain.communicationEvent, (message) => {
      if (message.shouldOpen) {
        curtain.actionHandler.open();
      } else if (message.shouldClose) {
        curtain.actionHandler.close();
      } else {
        curtain.actionHandler.adjust(message.closedPercentage);
      }
    });
  });

  /*
   * Registers events for outlets
   */
  const outlets = DeviceManager.getDevicesByType('outlet');
  outlets.forEach((outlet) => {
    client.on(outlet.communicationEvent, (message) => {
      outlet.actionHandler.setState(message.state);
    });
  });

  /*
   * Registers events for fire sensors
   */
  const fireSensors = DeviceManager.getDevicesByType('fire');
  fireSensors.forEach((fireSensor) => {
    setInterval(() => {
      const reading = fireSensor.actionHandler.read();
      client.emit(fireSensor.communicationEvent, {
        reading,
      });
    }, 5000);
  });

  /*
   * Registers events for locks
   */
  const locks = DeviceManager.getDevicesByType('lock');
  locks.forEach((lock) => {
    client.on(lock.communicationEvent, (message) => {
      lock.actionHandler.setState(message.state);
    });
  });
});
