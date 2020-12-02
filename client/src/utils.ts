import moment, { Moment } from 'moment';

export const formatRfiNum = (id: string): string => {
  let year: string = id.substr(id.length - 8, 2);
  let number: string = id.substr(id.length - 3, 3);
  return `${year}-${number}`;
};

export const convertTimeStringToMoment = (time: string): Moment => {
  const moment = require('moment');
  time = time.replace(/_/g, '0');

  let hours: number = +time.substr(0, 2);
  let minutes: number = +time.substr(3, 2);
  let seconds: number = +time.substr(6, 2);

  let timeDate: Date = new Date(
    (hours * 3600 +
      minutes * 60 +
      seconds)
    * 1000,
  );
  return moment(timeDate).utc();
};

export const getLastName = (userName: string): string => {
  let sections: string[] = userName.split('.');
  if (sections.length === 1) {
    return sections[0];
  } else if (sections.length === 2) {
    return sections[1];
  } else {
    let lastPart = sections[sections.length - 1];
    if (lastPart === 'mil' || lastPart === 'civ' || lastPart === 'ctr' || lastPart.match(/[A-z]/) === null) {
      lastPart = sections[sections.length - 2];
    }
    lastPart = lastPart.replace(/[0-9]/g, '');
    lastPart = lastPart[0].toUpperCase() + lastPart.substring(1);
    return lastPart;
  }
};

export const truncateAndConvertDateToUtc = (date: Date): Date => {
  let newDate = new Date(moment(date).utc(true).unix() * 1000); //convert date to UTC
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const weakMatchMgrsError = (mgrs: string): boolean => {
  return mgrs.length > 15 || (mgrs.length === 15 && mgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null);
}

export const strongMatchMgrsError = (mgrs: string): boolean => {
  return mgrs.length !== 15 || mgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null;
}

export enum RowAction {
  NONE,
  DELETING,
  SUBMITTING
}

interface ViewState {
  rfiId: number|undefined;
  tgtId: number|undefined;
}

export interface Cookie {
  userName: string;
  segments: number[];
  viewState: ViewState
}
