export function snakeCaseToHumanReadable(snakeCaseString: string) {
    return snakeCaseString
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }