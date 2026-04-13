"use client";

import Link from "next/link";

export function Header() {
  return (
    <header role="banner">
      <div>
        <span>Sidebar Toggle</span>
        <span>Logo</span>
      </div>
      <nav role="navigation" aria-label="Main Navigation">
        <Link href="/primitives">Primitives</Link>
      </nav>
      <div>
        <span>GithubLink</span>
        <span>BlogPageLink</span>
        <span>ThemeToggle</span>
      </div>
    </header>
  );
}
