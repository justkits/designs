import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  useContext,
} from "react";

import { AsChild } from "@/core/asChild";
import { ItemContext, MenuContext, useSelect } from "./internals/contexts";

export function SelectItemGroup({
  children,
  className,
  style,
  ...rest
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const isInsideMenu = useContext(MenuContext);

  if (!isInsideMenu) {
    throw new Error("Select.ItemGroup must be used within a Select.Menu");
  }

  return (
    <div {...rest} role="group" className={className} style={style}>
      {children}
    </div>
  );
}

type SelectItemNormalProps = {
  value: string;
  disabled?: never;
  asChild?: boolean;
};

type SelectItemDisabledProps = {
  value?: never;
  disabled: true;
  asChild?: boolean;
};

type SelectItemProps = (SelectItemNormalProps | SelectItemDisabledProps) &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled">;

export function SelectItem({
  value,
  asChild = false,
  disabled,
  children,
  className,
  style,
  ...rest
}: Readonly<SelectItemProps>) {
  const { value: selectedValue, closeMenu, onValueChange } = useSelect();
  const isInsideMenu = useContext(MenuContext);

  if (!isInsideMenu) {
    throw new Error("Select.Item must be used within a Select.Menu");
  }

  const onSelect = () => {
    if (disabled) return;

    onValueChange(value);
    closeMenu();
  };

  if (asChild) {
    return (
      <ItemContext.Provider value={true}>
        <AsChild
          {...rest}
          role="option"
          className={className}
          style={style}
          onClick={onSelect}
          disabled={disabled}
          aria-disabled={disabled}
          aria-selected={value === selectedValue}
        >
          {children}
        </AsChild>
      </ItemContext.Provider>
    );
  }

  return (
    <ItemContext.Provider value={true}>
      <button
        {...rest}
        role="option"
        className={className}
        style={style}
        onClick={onSelect}
        disabled={disabled}
        aria-disabled={disabled}
        aria-selected={value === selectedValue}
      >
        {children}
      </button>
    </ItemContext.Provider>
  );
}

type SelectItemTextProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export function SelectItemText({
  asChild = false,
  children,
  className,
  style,
  ...rest
}: Readonly<SelectItemTextProps>) {
  const isInsideItem = useContext(ItemContext);

  if (!isInsideItem) {
    throw new Error("Select.ItemText must be used within a Select.Item");
  }

  if (asChild) {
    return (
      <AsChild {...rest} className={className} style={style}>
        {children}
      </AsChild>
    );
  }

  return (
    <span {...rest} className={className} style={style}>
      {children}
    </span>
  );
}
