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
