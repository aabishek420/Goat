export function cn(
  ...inputs: (string | undefined | null | boolean | { [key: string]: any })[]
) {
  return inputs
    .flat()
    .filter(Boolean)
    .map((input) => {
      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return input;
    })
    .join(" ");
}
