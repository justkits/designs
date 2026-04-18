// utils
export {
  createBreakpointQueries,
  createSimpleBreakpointQueries,
} from "./breakpoint/utils";

// types
import type {
  BreakpointQueries,
  SimpleBreakpointQueries,
} from "./breakpoint/types";

export type MediaQueries = {
  breakpoint?: BreakpointQueries | SimpleBreakpointQueries;
  hoverable?: string;
};

export type {
  BreakpointQueries,
  SimpleBreakpointQueries,
} from "./breakpoint/types";
