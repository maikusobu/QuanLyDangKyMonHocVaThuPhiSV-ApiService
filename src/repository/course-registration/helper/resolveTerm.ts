import { TERM } from "@util/constants";

export const resolveTerm = (term: TERM) => {
  switch (term) {
    case TERM.FIRST:
      return 1;
    case TERM.SECOND:
      return 2;
    case TERM.THIRD:
      return 3;
    default:
      return 0;
  }
};

export const reverseTerm = (term: number) => {
  switch (term) {
    case 1:
      return TERM.FIRST;
    case 2:
      return TERM.SECOND;
    case 3:
      return TERM.THIRD;
    default:
      return TERM.FIRST;
  }
};
