import { join } from "node:path";

import { ConfigManager } from "@/config/manager";
import { FileToWrite } from "./base";

export class FacadeComponentFile extends FileToWrite {
  constructor(familyName: string, componentName: string) {
    const outPath = join(
      ConfigManager.config.outDir,
      familyName,
      `${componentName}.tsx`,
    );

    const content = [
      `import type { IconProps } from "@justkits/svg2tsx";`,
      "",
      `import { iconMap, type IconName } from "./iconMap";`,
      "",
      "type Props = IconProps & { icon: IconName };",
      "",
      `export function ${componentName}({ icon, size, ...rest }: Readonly<Props>) {`,
      "  const IconComponent = iconMap[icon];",
      "",
      "  if (!IconComponent) {",
      "    console.warn(`Icon not found: ${icon}`);",
      "    return null;",
      "  }",
      "",
      "  return <IconComponent size={size} {...rest} />;",
      "}",
      "",
    ];

    super(outPath, content);
  }

  public prepare(): void {
    this.content = this.lines.join("\n");
  }
}
