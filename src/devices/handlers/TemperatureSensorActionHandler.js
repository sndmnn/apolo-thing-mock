export default class TemperatureSensorActionHandler {
  /**
   * Generates a random temperature value between 0 and 40
   *
   * @returns the generated temperature value
   */
  read() {
    return Math.floor(Math.random() * 40);
  }
}
