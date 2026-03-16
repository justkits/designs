# Guides: Typography

Typography는 토큰을 `font-size`, `font-weight`, `line-height`를 각각 따로 정의하는 것보다, 하나로 묶어서 선언하는 것이 좋다고 생각하여 이에 알맞는 구조를 제공한다. 제공되는 타입과 변수들을 활용하여, 구축할 Design System에서 `<Text />`, `<Quote />`, `<Code />` 등 컴포넌트를 만들어서 제공하면 된다. 스타일링은 팀에서 정한대로 지정해주면 되고, 만약 더 많은 Variants가 필요하다면, 본 라이브러리의 타입을 `extend`해서 사용하면 된다.

## Tips

1. **reset.css**

본 라이브러리에서 제공하는 `reset.css`를 활용하면, 브라우저 기본 스타일링이 제거된다. 구체적으로는: - `<Text />`에 지정되어 있는 `h1`~`h6`, `p`에 대해 `margin`과 `padding`값이 사라진다. - TODO: Quote와 Code에 대한 reset.css

2. **ESLint Rules**

`@justkits/design-eslint-rules`에서 제공하는 플러그인을 사용하면, 기본 html 태그를 사용하는 실수를 방지할 수 있다. 가령 `<Text />` 컴포넌트가 있는데, `<h1 />`이나 `<p />`를 사용하면 오류가 발생한다.

## Example

### 1. Text — Vanilla Extract

`as` prop으로 기본 태그를 override할 수 있다. `textTagMap`이 variant별 기본 태그를 결정하지만, semantic 또는 레이아웃 이유로 다른 태그가 필요할 때 사용한다.

> **`h5` / `h6`에 대하여** — `TextVariants`는 의도적으로 `h4`까지만 제공한다. 대부분의 UI에서 4단계 이상의 heading 계층은 필요하지 않으며, 필요한 경우 `as` prop으로 대응할 수 있다.
>
> ```tsx
> <Text variant="titleSmall" as="h5">
>   깊은 계층의 제목
> </Text>
> ```

```ts
// src/components/Text.tsx
import { TextTagOptions, TextProps, textTagMap } from "@justkits/design-foundations";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export function Text<T extends keyof TextTagOptions>({ variant, as, className, children, ...rest}: Readonly<TextProps<T>>) {
    const Component = as ?? textTagMap[variant];

    return (
        <Component className={clsx(styles.text({ variant }), className)} {...rest}>
            {children}
        </Component>
    )
}
```

```ts
// src/components/styles.css.ts
import { recipe } from "@vanilla-extract/recipes";

const text = recipe({
  base: {
    // reset.css에서 사용하지 않을거면 여기서 선언해도 된다.
    margin: 0,
    padding: 0,
  },
  variants: {
    variant: {
      hero: {
        fontSize: "3rem",
        fontWeight: "bolder",
        lineHeight: "3.5rem",
        // variant별로 색상을 다르게 지정해도 좋다.
      },
      titleLarge: {
        fontSize: "2rem",
        fontWeight: "bolder",
        lineHeight: "2.5rem",
      },
      // {...}
    },
  },
});

export const styles = { text };
```

#### App usage

```tsx
// 기본: titleLarge → <h2>
<Text variant="titleLarge">Section Title</Text>

// SEO상 h1이 이미 있어서 h3으로 낮춰야 할 때
<Text variant="titleLarge" as="h3">Section Title</Text>

// 인라인으로 렌더링해야 할 때
<Text variant="bodyMedium" as="span">Inline text</Text>
```

#### Extending TextVariants

기본 제공 variants 외에 추가 variants가 필요하다면 `TextVariants`를 `extend`해서 사용할 수 있다.

```ts
// src/types/typography.ts
import {
  TextVariants,
  TextTagOptions,
  textTagMap,
} from "@justkits/design-foundations";

export type CustomTextVariants = TextVariants | "overline" | "eyebrow";

export const customTextTagMap: Record<
  CustomTextVariants,
  keyof TextTagOptions
> = {
  ...textTagMap,
  overline: "span",
  eyebrow: "span",
};
```

`TextProps`는 `variant`의 타입에 의존하므로, 컴포넌트도 custom variant 타입으로 재정의해준다.

```tsx
// src/components/Text.tsx
import { TextTagOptions, ComponentProps } from "@justkits/design-foundations";
import { clsx } from "clsx";

import { CustomTextVariants, customTextTagMap } from "../types/typography";
import { styles } from "./styles.css";

type CustomTextProps<T extends keyof TextTagOptions> = {
  variant: CustomTextVariants;
  as?: T;
} & ComponentProps<T>;

export function Text<T extends keyof TextTagOptions>({
  variant,
  as,
  className,
  children,
  ...rest
}: Readonly<CustomTextProps<T>>) {
  const Component = as ?? customTextTagMap[variant];

  return (
    <Component className={clsx(styles.text({ variant }), className)} {...rest}>
      {children}
    </Component>
  );
}
```

스타일링 쪽에도 새 variants를 추가해주면 된다.

```ts
// src/components/styles.css.ts
const text = recipe({
  // {...}
  variants: {
    variant: {
      // 기존 variants...
      overline: {
        fontSize: "0.75rem",
        fontWeight: "600",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
      eyebrow: {
        fontSize: "0.75rem",
        fontWeight: "500",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "gray",
      },
    },
  },
});
```

### 2. Code — styled-components

`<Code />`는 `as` prop을 지원하지 않는다. 각 variant는 HTML 태그와 의미상 1:1로 대응되기 때문에, 태그를 override할 이유가 없다고 판단했다.

| Variant    | Tag      | 용도                       |
| ---------- | -------- | -------------------------- |
| `inline`   | `<code>` | 문장 내 짧은 코드 스니펫   |
| `block`    | `<pre>`  | 여러 줄 코드 블록          |
| `keyboard` | `<kbd>`  | 키보드 입력 (예: `Ctrl+S`) |
| `sample`   | `<samp>` | 프로그램 출력 샘플         |

```tsx
// src/components/Code.tsx
import {
  CodeTagOptions,
  CodeProps,
  codeTagMap,
} from "@justkits/design-foundations";
import styled, { css } from "styled-components";

const codeStyles = {
  inline: css`
    font-family: monospace;
    font-size: 0.875em;
    background: #f4f4f4;
    padding: 0.1em 0.3em;
    border-radius: 3px;
  `,
  block: css`
    font-family: monospace;
    font-size: 0.875rem;
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
  `,
  keyboard: css`
    font-family: monospace;
    font-size: 0.8em;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0.1em 0.4em;
    box-shadow: 0 1px 0 #ccc;
  `,
  sample: css`
    font-family: monospace;
    font-size: 0.875em;
    color: #666;
  `,
};

export function Code<T extends keyof CodeTagOptions>({
  variant,
  children,
  ...rest
}: Readonly<CodeProps<T>>) {
  const Component = styled(codeTagMap[variant])`
    ${codeStyles[variant]}
  `;

  // ✅ Recommended: variant="block" should wrap children in <code> for correct semantics.
  // <pre> defines preformatted whitespace; <code> marks the content as code.
  // Together, <pre><code> is the standard for multi-line code blocks.
  if (variant === "block") {
    return (
      <Component {...rest}>
        <code>{children}</code>
      </Component>
    );
  }

  return <Component {...rest}>{children}</Component>;
}
```

#### App usage

```tsx
<Code variant="inline">useState()</Code>
<Code variant="block">{`function hello() {\n  return "world";\n}`}</Code>  {/* renders <pre><code>...</code></pre> */}
<Code variant="keyboard">Ctrl+S</Code>
<Code variant="sample">Build succeeded in 1.2s</Code>
```

### 3. Quote — Tailwind CSS

`<Quote />`는 `as` prop을 지원하지 않는다. `QuoteVariants`와 HTML 태그(`blockquote`, `q`, `cite`)는 의미상 1:1로 대응되기 때문에, 태그를 override할 이유가 없다고 판단했다.

```tsx
// src/components/Quote.tsx
import {
  QuoteTagOptions,
  QuoteProps,
  quoteTagMap,
} from "@justkits/design-foundations";
import { clsx } from "clsx";

const quoteClassMap: Record<string, string> = {
  block: "border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4",
  inline: "italic",
  citation: "text-sm text-gray-500 not-italic",
};

export function Quote<T extends keyof QuoteTagOptions>({
  variant,
  className,
  children,
  ...rest
}: Readonly<QuoteProps<T>>) {
  const Component = quoteTagMap[variant];

  return (
    <Component className={clsx(quoteClassMap[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
```

#### App usage

```tsx
<Quote variant="block">
    디자인은 단순히 어떻게 보이고 느껴지는가가 아니다. 디자인은 어떻게 작동하는가이다.
    <Quote variant="citation">Steve Jobs</Quote>
</Quote>

<p>그가 말했다: <Quote variant="inline">Hello, world.</Quote></p>
```
