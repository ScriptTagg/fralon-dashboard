export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // strip anything that's not a letter, number, space, or hyphen
    .replace(/\s+/g, "-");
}

// "Peanut Butter (500g)" → "peanut-butter-500g"
