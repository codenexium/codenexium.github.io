/**
 * Centering a lone item in the last row.
 *
 * CSS Grid always places the first item of a row in column 1, so a section
 * with 4 cards at 3 columns renders 3 + 1 with the odd one out hard against
 * the left edge. There is no CSS-only selector for "am I alone in my row",
 * because that depends on the item count at each breakpoint.
 *
 * Flexbox solves it for free: with `flex-wrap` and `justify-center`, a final
 * row that does not fill up is centered as a whole. These helpers swap
 * `grid-cols-N` for a matching flex basis, so column widths stay exactly what
 * `grid-cols-N` + `gap-*` produced.
 *
 * Item width for N columns and a gap of G is (100% - (N - 1) * G) / N, which is
 * what makes the gaps line up.
 *
 * Every entry below is written out as a complete class name including its
 * breakpoint prefix. Tailwind extracts classes by scanning source text for
 * literals, so a value assembled at runtime (`${bp}:basis-[...]`) is silently
 * dropped from the build. Writing them out keeps them discoverable.
 *
 * Usage:
 *   const row = { cols: { sm: 2, lg: 3 }, gap: "gap-6" }
 *   <Stagger className={centeredRow(row)}>
 *     <StaggerItem className={centeredItem({ ...row, className: "h-full" })}>
 */

/** Tailwind's default breakpoints. */
const PREFIXES = { sm: true, md: true, lg: true, xl: true };

/**
 * The full class names for every supported combination, written as literals.
 * `BASIS[columns][gap][breakpoint]` is what Tailwind sees in the source.
 */
const BASIS = {
  2: {
    "gap-4": {
      sm: "sm:basis-[calc(50%_-_0.5rem)]",
      md: "md:basis-[calc(50%_-_0.5rem)]",
      lg: "lg:basis-[calc(50%_-_0.5rem)]",
      xl: "xl:basis-[calc(50%_-_0.5rem)]",
    },
    "gap-5": {
      sm: "sm:basis-[calc(50%_-_0.625rem)]",
      md: "md:basis-[calc(50%_-_0.625rem)]",
      lg: "lg:basis-[calc(50%_-_0.625rem)]",
      xl: "xl:basis-[calc(50%_-_0.625rem)]",
    },
    "gap-6": {
      sm: "sm:basis-[calc(50%_-_0.75rem)]",
      md: "md:basis-[calc(50%_-_0.75rem)]",
      lg: "lg:basis-[calc(50%_-_0.75rem)]",
      xl: "xl:basis-[calc(50%_-_0.75rem)]",
    },
  },
  3: {
    "gap-4": {
      sm: "sm:basis-[calc(33.333%_-_0.667rem)]",
      md: "md:basis-[calc(33.333%_-_0.667rem)]",
      lg: "lg:basis-[calc(33.333%_-_0.667rem)]",
      xl: "xl:basis-[calc(33.333%_-_0.667rem)]",
    },
    "gap-5": {
      sm: "sm:basis-[calc(33.333%_-_0.833rem)]",
      md: "md:basis-[calc(33.333%_-_0.833rem)]",
      lg: "lg:basis-[calc(33.333%_-_0.833rem)]",
      xl: "xl:basis-[calc(33.333%_-_0.833rem)]",
    },
    "gap-6": {
      sm: "sm:basis-[calc(33.333%_-_1rem)]",
      md: "md:basis-[calc(33.333%_-_1rem)]",
      lg: "lg:basis-[calc(33.333%_-_1rem)]",
      xl: "xl:basis-[calc(33.333%_-_1rem)]",
    },
  },
  4: {
    "gap-4": {
      sm: "sm:basis-[calc(25%_-_0.75rem)]",
      md: "md:basis-[calc(25%_-_0.75rem)]",
      lg: "lg:basis-[calc(25%_-_0.75rem)]",
      xl: "xl:basis-[calc(25%_-_0.75rem)]",
    },
    "gap-5": {
      sm: "sm:basis-[calc(25%_-_0.938rem)]",
      md: "md:basis-[calc(25%_-_0.938rem)]",
      lg: "lg:basis-[calc(25%_-_0.938rem)]",
      xl: "xl:basis-[calc(25%_-_0.938rem)]",
    },
    "gap-6": {
      sm: "sm:basis-[calc(25%_-_1.125rem)]",
      md: "md:basis-[calc(25%_-_1.125rem)]",
      lg: "lg:basis-[calc(25%_-_1.125rem)]",
      xl: "xl:basis-[calc(25%_-_1.125rem)]",
    },
  },
  5: {
    "gap-6": {
      sm: "sm:basis-[calc(20%_-_1.2rem)]",
      md: "md:basis-[calc(20%_-_1.2rem)]",
      lg: "lg:basis-[calc(20%_-_1.2rem)]",
      xl: "xl:basis-[calc(20%_-_1.2rem)]",
    },
  },
};

function resolve({ cols, gap }, fallback) {
  return Object.entries(cols ?? {})
    .filter(([bp, columns]) => PREFIXES[bp] && BASIS[columns]?.[gap]?.[bp])
    .map(([bp, columns]) => fallback(columns, gap, bp))
    .filter(Boolean)
    .join(" ");
}

/**
 * Container classes for a centering row. `cols` maps a breakpoint to the
 * column count from that breakpoint upwards, e.g. `{ sm: 2, lg: 3 }`. Below
 * the first breakpoint the row is a single full-width column, which
 * `centeredItem` handles.
 */
export function centeredRow({ cols, gap = "gap-6", className = "" } = {}) {
  const bases = resolve({ cols, gap }, (columns, g, bp) => BASIS[columns][g][bp]);
  return `flex flex-wrap justify-center ${gap} ${bases} ${className}`.replace(/\s+/g, " ").trim();
}

/** Classes for one child of a centering row. */
export function centeredItem({ cols, gap = "gap-6", className = "" } = {}) {
  const bases = resolve({ cols, gap }, (columns, g, bp) => BASIS[columns][g][bp]);
  return `w-full shrink-0 ${bases} ${className}`.replace(/\s+/g, " ").trim();
}
