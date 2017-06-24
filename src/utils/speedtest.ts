import Models from '../models';

const speedtestNet = require('speedtest-net');

interface SpeedtestServer {
  bestPing: number;
  cc: string;
  country: string;
  dist: number;
  distMi: number;
  host: string;
  id: number;
  lat: string;
  lon: string;
  name: string;
  sponsor: string;
  url: string;
  url2: string;
}

interface SpeedtestConfig {
  client: {
    ip: string;
    isp: string;
    ispdlavg: number;
    isprating: number;
    ispulavg: number;
    lat: number;
    lon: number;
  };
  download: {
    initialtest: string;
    mintestsize: string;
    testlength: string;
    threadsperurl: string;
  };
  times: {
    dl1: string;
    dl2: string;
    dl3: string;
    ul1: string;
    ul2: string;
    ul3: string;
  };
  upload: {
    initialtest: string;
    maxchunkcount: string;
    maxchunksize: string;
    mintestsize: string;
    ratio: string;
    threads: string;
    threadsperurl: string;
  };
}

interface SpeedtestResult {
  bestServer: SpeedtestServer;
  bestServers: SpeedtestServer[];
  config: SpeedtestConfig;
  downloadSpeed: number;
  resultUrl: undefined | string;
  servers: SpeedtestServer[];
  speedTestDownloadSpeed: number;
  speedTestUploadSpeed: number;
  uploadSpeed: number;
}

export default class Speedtest {

  private _isFinished = false;

  private _server: SpeedtestServer;

  private _downloadSpeed: number | null = null;

  private _uploadSpeed: number | null = null;

  private _startTime: number;

  private _endTime: number;

  private _test: any;

  constructor(
    private readonly _speedtester = speedtestNet
  ) {}

  get downloadSpeed() {
    return this._downloadSpeed;
  }

  get uploadSpeed() {
    return this._uploadSpeed;
  }

  get ping() {
    return this._server.bestPing;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get server() {
    return this._server;
  }

  public start() {
    if (this._isFinished) {
      throw new Error('Speedtest already ran!');
    }

    return new Promise<Speedtest>((resolve, reject) => {
      this._startTime = Date.now();
      const test = this._speedtester({ maxTime: 20000 });

      test.on('done', (result: SpeedtestResult) => {
        this.setTestResults(result);

        this._isFinished = true;
        this._endTime = Date.now();
        resolve(this);
      });

      test.on('error', (error: any) => {
        reject(error);
      });

      this._test = test;
    });

  }

  public async save() {
    if (!this._isFinished) {
      throw new Error('The speedtest has to be finished before a server model can be retreived');
    }

    await this.saveServerModel();
    await this.saveSpeedtestModel();
  }

  private async saveServerModel() {
    const model = await Models.Server
      .findOrCreate({
        defaults: { ...this.server },
        where: { id:  this.server.id }
      });

    return model;
  }

  private async saveSpeedtestModel() {
    const model = await Models.Speedtest
      .create({
        downloadSpeed: this.downloadSpeed,
        endTime: this.endTime,
        ping: this.ping,
        startTime: this.startTime,
        uploadSpeed: this.uploadSpeed
      });

    return model;
  }

  private setTestResults(result: SpeedtestResult): void {
    this._server = result.bestServer;
    this._downloadSpeed = result.speedTestDownloadSpeed;
    this._uploadSpeed = result.speedTestUploadSpeed;
  }
}
