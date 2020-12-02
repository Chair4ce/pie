export class RfiAssociationModel {
  constructor(
    private _rfiNum: string,
    private _description: string,
  ) {
  }

  get rfiNum(): string {
    return this._rfiNum;
  }

  get description(): string {
    return this._description;
  }
}

export class TgtAssociationModel {
  constructor(
    private _name: string,
    private _mgrs: string,
    private _emails: string[],
  ) {
  }

  get name(): string {
    return this._name;
  }

  get mgrs(): string {
    return this._mgrs;
  }

  get emails(): string[] {
    return this._emails;
  }
}

export class IxnAssociationModel {
  constructor(
    private _activity: string,
    private _trackNarrative: string
  ) {
  }

  get activity(): string {
    return this._activity;
  }

  get trackNarrative(): string {
    return this._trackNarrative;
  }
}
