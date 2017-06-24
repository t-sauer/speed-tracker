import Speedtest from './speedtest';

export default class SpeedtestRunner {

  private _handlers: Array<(test: Speedtest) => any> = [];

  constructor(
    readonly testInterval: number
  ) {
    setTimeout(() => {
      this.runTest();
    }, 0);
  }

  public onTestFinished(callback: (test: Speedtest) => any) {
    this._handlers.push(callback);
  }

  private async runTest() {
    const speedtest = new Speedtest();

    try {
      await speedtest.start();

      this._handlers.forEach((handler) => {
        handler(speedtest);
      });
    } finally {
      setTimeout(() => {
        this.runTest();
      }, this.testInterval);
    }
  }

}
