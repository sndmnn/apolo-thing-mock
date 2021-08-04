export default class FireSensorActionHandler {
  /**
   * Simulates the reading of a fire sensor
   *
   * @returns either 0 (if no fire is detected) or 1 (if fire is detected)
   */
  read() {
    return Math.round(Math.random());
  }
}
