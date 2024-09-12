export class Time {
  constructor(startTIme = 0, endTime) {
    this.startTIme = startTIme;
    this.endTime = endTime;
    this.timeMatch = {
      minute: 0,
      second: 0,
    };
    this.running = true;
  }

  getstartTime() {
    return this.startTIme;
  }

  getendTime() {
    return this.endTime;
  }

  formateTime(seconds) {
    let min = Math.floor((seconds % 3600) / 60);
    let seg = seconds % 60;

    this.timeMatch.minute = min;
    this.timeMatch.second = seg;
  }

  startMatchTime() {
    if (this.running) {
      setTimeout(() => {
        this.startTIme++;
        this.formateTime(this.startTIme);
        this.overGame();
        this.startMatchTime();
        console.log(this.timeMatch);
        console.log(this.getstartTime());
      }, 1000);
    }
  }

  pauseMatchTime() {
    this.running = false;
  }

  backMatchTime() {
    this.running = true;
  }

  getLinePorcent() {
    const line = (this.startTIme / this.endTime) * 100;
 
    return line
  }

  overGame() {
    if (this.startTIme >= this.endTime) {
      this.pauseMatchTime();
    }
  }
}
