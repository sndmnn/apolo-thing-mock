export default class CurtainActionHandler {
  constructor() {
    this.stepperValue = 0;
    this.stepperMaxValue = 1000;
  }

  /**
   * Simulates the adjustment of a stepper motor
   *
   * @param {number} percentage how much the courtain should be closed
   */
  adjust(percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new Error('The curtain cannot be opened beyond the stepper capacity');
    }

    this.stepperValue = this.stepperMaxValue * (percentage / 100);
    console.log(`Curtain adjusted to ${percentage}%. Current stepper value is at: ${this.stepperValue}`);
  }

  /**
   * Simulates the adjustment of a stepper motor to a value at which the curtain can be fully closed
   */
  open() {
    this.stepperValue = this.stepperMaxValue;
    console.log('Curtain opened');
  }

  /**
   * Simulates the adjustment of a stepper motor to a value at which the curtain can be fully opened
   */
  close() {
    this.stepperValue = 0;
    console.log('Curtain closed');
  }
}
