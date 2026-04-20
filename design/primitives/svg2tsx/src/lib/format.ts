// kebab-case + 단, 숫자로 시작할 수 없다
export function kebabToPascal(str: string): string {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(str)) {
    throw new Error(
      `Invalid icon name: "${str}". Filenames must be strictly kebab-case (lowercase letters, digits, and hyphens only, e.g., "my-icon" or "icon-2x").`,
    );
  }

  const pascalName = str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return pascalName;
}
