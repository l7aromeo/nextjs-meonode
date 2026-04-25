'use client'
import { Node, Theme, ThemeProvider as MeoThemeProvider, PortalProvider, PortalHost, Children } from '@meonode/ui'
import { initializeStore, ReduxProviderWrapper, RootState } from '@src/redux/store'
import { StrictMode, useEffect, useMemo, useState } from 'react'
import { CssBaseline } from '@meonode/mui'
import darkTheme from '@src/constants/themes/darkTheme'
import lightTheme from '@src/constants/themes/lightTheme'
import { StyleRegistry } from '@meonode/ui/nextjs-registry'

const ThemeProvider = ({ children, theme }: { children: Children; theme: Theme }) => {
  const [loadedTheme, setLoadedTheme] = useState<Theme>(theme)

  useEffect(() => {
    if (!theme) {
      const stored = localStorage.getItem('theme')

      if (!stored) {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        setLoadedTheme(isDark ? darkTheme : lightTheme)
      } else {
        setLoadedTheme(stored === 'dark' ? darkTheme : lightTheme)
      }
    }
  }, [theme])

  return MeoThemeProvider({
    theme: loadedTheme!,
    children,
  })
}

export const Wrapper = ({
  preloadedState,
  themeMode,
  children,
}: {
  preloadedState?: RootState
  themeMode?: Theme['mode']
  children: Children
}) => {
  const initialStore = useMemo(() => initializeStore(preloadedState), [preloadedState])
  const theme = useMemo(() => {
    switch (themeMode) {
      case 'dark':
        return darkTheme
      case 'light':
      default:
        return lightTheme
    }
  }, [themeMode])

  return Node(StrictMode, {
    children: StyleRegistry({
      children: [
        CssBaseline(),
        ReduxProviderWrapper({
          store: initialStore,
          children: PortalProvider({
            children: ThemeProvider({
              theme,
              children: Array.isArray(children) ? [...children, PortalHost()] : [children, PortalHost()],
            }),
          }),
        }),
      ],
    }),
  }).render()
}
