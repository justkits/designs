import type { IconProps } from "@justkits/svg2tsx";
export function CheckFill({ size = 16, ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M8 1.333a6.667 6.667 0 1 1 0 13.333A6.667 6.667 0 0 1 8 1.333m2.357 4.254-3.3 3.3-1.414-1.414a.667.667 0 1 0-.943.943l1.839 1.839a.733.733 0 0 0 1.037 0L11.3 6.53a.667.667 0 1 0-.943-.944"
      />
    </svg>
  );
}
