export default class LEDActionHandler {
  constructor() {
    this.state = 0;
  }

  setState(binaryValue) {
    if (!(binaryValue === 0 || binaryValue === 1)) {
      throw new Error('Ivalid binary value for LED');
    }

    this.state = binaryValue;
    console.log(this.state ? 'Light on' : 'Light off');
  }
}
