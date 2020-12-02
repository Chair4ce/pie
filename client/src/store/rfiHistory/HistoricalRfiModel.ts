import RfiFeedbackModel from '../rfi/RfiFeedbackModel';
import RfiModel from '../rfi/RfiModel';

export class HistoricalRfiModel {
  private readonly _rfi: RfiModel;
  private readonly _feedback: RfiFeedbackModel;

  constructor(rfi: RfiModel, feedback: RfiFeedbackModel) {
    this._rfi = rfi;
    this._feedback = feedback;
  }

  get rfi(): RfiModel {
    return this._rfi;
  }

  get feedback(): RfiFeedbackModel {
    return this._feedback;
  }
}
