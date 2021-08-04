export default class OutletActionHandler {
  constructor() {
    this.state = 0;
  }

  setState(binaryValue) {
    if (!(binaryValue === 0 || binaryValue === 1)) {
      throw new Error('Ivalid binary value for Outlet');
    }

    this.state = binaryValue;
    console.log(this.state === 0 ? 'Outlet off' : 'Outlet on');
  }
}
