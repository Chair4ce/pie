export enum Timeliness {
  DEFAULT = '',
  EARLY = 'Delivered Early',
  ON_TIME = 'Delivered On Time',
  LATE = 'Delivered Late',
  NEVER = 'Never Delivered'
}

export enum Quality {
  DEFAULT = '',
  HIGH = 'High Quality',
  LOW = 'Low Quality',
  BAD = 'Bad Quality'
}

export enum MissionImpact {
  DEFAULT = '',
  HIGH = 'High Impact',
  LOW = 'Low Impact',
  NO = 'No Impact'
}

export default class RfiFeedbackModel {
  constructor(
    public rfiNum: string,
    public stars: number,
    public timeliness: Timeliness,
    public quality: Quality,
    public missionImpact: MissionImpact,
    public comments: string,
  ) {
  }
}
