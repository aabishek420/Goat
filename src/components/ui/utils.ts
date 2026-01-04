export function cn(
  ...inputs: (
    | string
    | undefined
    | null
    | boolean
    | { [key: string]: unknown }
  )[]
) {
  return inputs
    .flat()
    .filter(Boolean)
    .map((input) => {
      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return input;
    })
    .join(" ");
}
