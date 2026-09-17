import type { ThemeScriptConfig } from '@meonode/ui'

/**
 * The one description of this app's themes, read by both halves.
 *
 * `themeScript` bakes it into the pre-paint script and `ThemeProvider` renders
 * from it, so the two cannot disagree about which modes exist or which applies
 * by default. Passing the same literal to both is the point.
 *
 * `system` maps the operating system's `prefers-color-scheme` signal onto this
 * app's own mode names — they are `light` and `dark` here, but they do not have
 * to be.
 */
export const themeConfig = {
  modes: ['light', 'dark'],
  defaultMode: 'light',
  defaultPreference: 'system',
  system: { light: 'light', dark: 'dark' },
} satisfies ThemeScriptConfig

export default themeConfig
