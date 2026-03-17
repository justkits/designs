# JustKits Design System

A monorepo containing design system packages for building consistent UIs.

## Packages

| Package | Version | Description |
| ------- | ------- | ----------- |
| [`@justkits/design-foundations`](./packages/foundations) | `0.0.0` *(pre-release)* | Design tokens, theme system, typography types, and CSS reset |
| [`@justkits/motion`](./packages/motion) | `1.0.0` | CSS-based loop animations and enter/exit transitions for React |
| [`@justkits/svg2tsx`](./packages/svg2tsx) | `1.1.2` | CLI tool to convert SVG file sets into React components |

## @justkits/design-foundations

Provides token types and a theme system to use as the foundation of any design system. Concrete styling is left to the consuming team.

→ See the [full documentation](./packages/foundations/README.md)

## @justkits/motion

Apply loop animations and enter/exit transitions to React components using CSS. Automatically handles the `prefers-reduced-motion` media query.

→ See the [full documentation](./packages/motion/README.md)

## @justkits/svg2tsx

A CLI tool that batch-converts SVG files into TypeScript React components, built on top of `svgr` for convenience.

```bash
pnpm svg2tsx generate
```

→ See the [full documentation](./packages/svg2tsx/README.md)

## Development

This project uses [pnpm](https://pnpm.io/) workspaces and [Turborepo](https://turbo.build/).

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```
