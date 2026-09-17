import baseThemeSystem from './baseThemeSystem'

/**
 * Every themed colour, as a reference rather than a value.
 *
 * The values live in `src/app/globals.css`, under `:root` for light and
 * `[data-theme='dark']` for dark. This names them.
 *
 * Both modes share this one object, so the `:root{--meonode-theme-*}` block the
 * provider renders is identical for every reader — which is what lets the server
 * send one document and a CDN cache it. Which palette applies is decided by the
 * `data-theme` attribute the pre-paint script writes on `<html>`.
 */
export const themeTokens = {
  ...baseThemeSystem,
  primary: { default: 'var(--primary)', content: 'var(--primary-content)', muted: 'var(--primary-muted)', hover: 'var(--primary-hover)' },
  secondary: { default: 'var(--secondary)', content: 'var(--secondary-content)', muted: 'var(--secondary-muted)', hover: 'var(--secondary-hover)' },
  accent: { default: 'var(--accent)', content: 'var(--accent-content)', muted: 'var(--accent-muted)', hover: 'var(--accent-hover)' },
  neutral: { default: 'var(--neutral)', content: 'var(--neutral-content)', muted: 'var(--neutral-muted)', hover: 'var(--neutral-hover)' },
  base: { default: 'var(--base)', medium: 'var(--base-medium)', deep: 'var(--base-deep)', content: 'var(--base-content)', muted: 'var(--base-muted)', hover: 'var(--base-hover)' },
  success: { default: 'var(--success)', content: 'var(--success-content)', muted: 'var(--success-muted)', hover: 'var(--success-hover)' },
  warning: { default: 'var(--warning)', content: 'var(--warning-content)', muted: 'var(--warning-muted)', hover: 'var(--warning-hover)' },
  error: { default: 'var(--error)', content: 'var(--error-content)', muted: 'var(--error-muted)', hover: 'var(--error-hover)' },
  danger: { default: 'var(--danger)', content: 'var(--danger-content)', muted: 'var(--danger-muted)', hover: 'var(--danger-hover)' },
  info: { default: 'var(--info)', content: 'var(--info-content)', muted: 'var(--info-muted)', hover: 'var(--info-hover)' },
  shadow: { default: 'var(--shadow)', sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)', xl: 'var(--shadow-xl)', '2xl': 'var(--shadow-2xl)' },
}

export default themeTokens
