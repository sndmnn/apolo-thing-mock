export default class LockActionHandler {
  constructor() {
    this.state = 0;
  }

  setState(binaryValue) {
    if (!(binaryValue === 0 || binaryValue === 1)) {
      throw new Error('Invalid binary value for Lock');
    }

    this.state = binaryValue;
    console.log(this.state === 0 ? 'Unlocked' : 'Locked');
  }
}
