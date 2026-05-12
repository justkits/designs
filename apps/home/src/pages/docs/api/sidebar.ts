import { cache } from "react";
import { getSidebarItems as _getSidebarItems } from "@justkits/docs/next";

export const getSidebarItems = cache(_getSidebarItems);
