import { iconMap, type IconName } from "./icon-map";
import { type IconProps } from "./types";

type Props = {
  icon: IconName;
} & IconProps;

export function AppIcon({ icon, size = 24, ...rest }: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  return <IconComponent size={size} {...rest} />;
}
