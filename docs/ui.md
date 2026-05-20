# UI Coding Standards

## Component Library

**Only shadcn/ui components are permitted in this project.** No custom UI components should be created under any circumstances.

- Use components from the shadcn/ui registry exclusively
- Install new components via `npx shadcn@latest add <component>`
- Do not build bespoke wrappers, custom primitives, or one-off styled elements
- If a needed UI pattern is not available in shadcn/ui, find the closest existing component and adapt it through props/composition — not by writing a new component

## Date Formatting

All date formatting must use [date-fns](https://date-fns.org/). Dates must be displayed in the following format:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

Use the `do MMM yyyy` format token with `format` from date-fns:

```ts
import { format } from "date-fns";

format(date, "do MMM yyyy"); // "1st Sep 2025"
```

Do not use `toLocaleDateString`, `Intl.DateTimeFormat`, or any other date formatting utility.
