# apolo-thing-mock
Code to mock sensors and other devices to test an IoT API

To run this project you need to copy the `config.json.template`, remove the `.template` part and fill it with your data.

Then just run `yarn start` and you should see a message on your console saying that the devices were successfully registered on the server (don't forget to have it running).

# Device messaging
## Lights
### Expects
```javascript
{
    state: number
}
```

- `state`: A binary value (either 1 or 0) indicating if the LED should be turned on (1) or off (0)

### Emits
Nothing

## Temperature Sensor
### Expects
Nothing

### Emits
```javascript
{
    temperature: number
}
```

## Curtain

### Expects
```javascript
{
    shouldOpen?: boolean
    shouldClose?: boolean
    closedPercentage?: number
}
```
Please note that only `shouldOpen`, `shouldClose` or `closedPercentage` should be sent within any given message

- `closedPercentage`: a number between 0 and 100 that indicate how much the curtain should be closed

### Emits
Nothing

## Power Outlet
### Expects
```javascript
{
    state: number
}
```

- `state`: A binary value (either 1 or 0) indicating if the outlet should be turned on (1) or off (0)

### Emits
Nothing

## Fire Sensors
### Expects
Nothing

### Emits
```javascript
{
    reading: number
}
```

- `reading`: A binary value (either 1 or 0) indicating if the sensor is detecting smoke (1) or not (0)

## Locks
### Expects
```javascript
{
    state: number
}
```

- `state`: A binary value (either 1 or 0) indicating if the lock should be locked (1) or unlocked (0)

### Emits
Nothing