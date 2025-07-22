// types.ts or inside ThemeContext.tsx

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  updateTheme: (newTheme: Theme) => void;
}
