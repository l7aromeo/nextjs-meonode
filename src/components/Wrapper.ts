'use client'
import { Children, Node, PortalHost, PortalProvider, Theme, ThemeProvider } from '@meonode/ui'
import { StrictMode, useMemo } from 'react'
import { CssBaseline } from '@meonode/mui'
import darkTheme from '@src/constants/themes/darkTheme'
import lightTheme from '@src/constants/themes/lightTheme'
import { StyleRegistry } from '@meonode/ui/nextjs-registry'
import { initializeStore, ReduxProvider, RootState } from '@src/redux/store'

export const Wrapper = ({
  preloadedState,
  themeMode,
  children,
}: {
  preloadedState?: Partial<RootState>
  themeMode?: Theme['mode']
  children?: Children
  isPortal?: boolean
}) => {
  const store = useMemo(() => initializeStore(preloadedState), [preloadedState])
  const theme = useMemo(() => {
    switch (themeMode) {
      case 'dark':
        return darkTheme
      case 'light':
        return lightTheme
      default:
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        return isDarkMode ? darkTheme : lightTheme
    }
  }, [themeMode])

  return Node(StrictMode, {
    children: StyleRegistry({
      children: ReduxProvider({
        store,
        children: PortalProvider({
          children: [
            CssBaseline(),
            ThemeProvider({
              theme,
              children: Array.isArray(children) ? children.concat(PortalHost()) : [children, PortalHost()],
            }),
          ],
        }),
      }),
    }),
  }).render()
}
