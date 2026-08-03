import type { ThemeConfig } from '@/types/hero'
import { agencyTheme } from './agency'
import { coffeeTheme } from './coffee'

export const themes: Record<string, ThemeConfig> = {
  agency: agencyTheme,
  coffee: coffeeTheme,
}

export const themeList = [coffeeTheme, agencyTheme]

export { agencyTheme, coffeeTheme }
