import { defineConfig } from "@justkits/svg2tsx";

export default defineConfig({
  type: "standalone",
  suffix: "Icon",
  index: false,
  assetsDir: "./assets/",
  srcDir: "./src/06.shared/ui/Icons/components/",
  options: {
    expandProps: "end",
    svgProps: {
      width: "{size}",
      height: "{size}",
    },
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: { overrides: { removeViewBox: false } },
        },
        {
          name: "convertColors",
          params: { currentColor: true },
        },
        "prefixIds",
        "removeDimensions",
      ],
    },
    template: (variables, { tpl }) => {
      return tpl`
        import type { IconProps } from '../types';

        export function ${variables.componentName}({size, ...props}: Readonly<IconProps>) {
          return (${variables.jsx});
        }
      `;
    },
  },
});
