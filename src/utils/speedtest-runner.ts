import Speedtest from './speedtest';

export default class SpeedtestRunner {

  private _handlers: Array<(test: Speedtest) => any> = [];

  private _timer: NodeJS.Timer;

  constructor(
    readonly testInterval: number
  ) {
    this._timer = setTimeout(() => {
      this.runTest();
    }, 0);
  }

  public onTestFinished(callback: (test: Speedtest) => any) {
    this._handlers.push(callback);
  }

  public stop() {
    clearTimeout(this._timer);
  }

  private async runTest() {
    const speedtest = new Speedtest();

    try {
      await speedtest.start();

      this._handlers.forEach((handler) => {
        handler(speedtest);
      });
    } finally {
      this._timer = setTimeout(() => {
        this.runTest();
      }, this.testInterval);
    }
  }

}
