export enum Field {
  PRIORITY = 'PRIORITY',
  LTIOV = 'LTIOV',
  START = 'START',
  RFINUM = 'RFINUM',
  CUSTOMER = 'CUSTOMER',
  COUNTRY = 'COUNTRY',
  TGTS = 'TGTS',
  IXNS = 'IXNS',
}

export class SortKeyModel {
  constructor(public field: Field, public defaultOrder: boolean) {
  }
}
