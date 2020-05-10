export interface IDateTime {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function isIDateTime(object: any): object is IDateTime {
  return (
    object.hasOwnProperty('days') || object.hasOwnProperty('hours') || object.hasOwnProperty('minutes') || object.hasOwnProperty('seconds')
  );
}
