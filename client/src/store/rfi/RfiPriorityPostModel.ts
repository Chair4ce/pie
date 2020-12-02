export default class RfiPriorityPostModel {
  public rfiNum: string;
  public priority: number;

  constructor(rfiNum: string, priority: number) {
    this.rfiNum = rfiNum;
    this.priority = priority;
  }
}
