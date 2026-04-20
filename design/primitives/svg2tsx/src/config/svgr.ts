import { type Config as _SvgrConfig } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";
import svgoPlugin from "@svgr/plugin-svgo";

// svgr 설정 중 유저가 설정할 수 있는 옵션
export type SettableSvgrConfig = Pick<
  _SvgrConfig,
  "expandProps" | "native" | "svgo" | "svgoConfig" | "exportType"
>;

type RestSvgrConfig = Omit<_SvgrConfig, keyof SettableSvgrConfig>;

// 최종 타입
export type SvgrConfig = Required<SettableSvgrConfig> & RestSvgrConfig;

export const defaultSvgrConfig: SvgrConfig = {
  icon: true,
  typescript: true,
  native: false,
  jsxRuntime: "automatic",
  expandProps: "start",
  svgProps: {
    width: "{size}",
    height: "{size}",
  },
  svgo: true,
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
  plugins: [svgoPlugin, jsxPlugin],
  exportType: "named",
  template: (variables, { tpl }) => {
    return tpl`
      import { IconProps } from "@justkits/svg2tsx";

      export function ${variables.componentName}({ size = 16,...props }: Readonly<IconProps>) {
        return (${variables.jsx});
      }
    `;
  },
};
