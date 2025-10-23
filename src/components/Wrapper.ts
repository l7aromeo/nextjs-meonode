'use client'
import { Children, Node, Theme, ThemeProvider as MeoThemeProvider } from '@meonode/ui'
import { initializeStore, ReduxProviderWrapper, RootState } from '@src/redux/store'
import { StrictMode, useEffect, useMemo, useState } from 'react'
import { CssBaseline } from '@meonode/mui'
import darkTheme from '@src/constants/themes/darkTheme'
import lightTheme from '@src/constants/themes/lightTheme'
import { StyleRegistry } from '@meonode/ui/nextjs-registry'

const ThemeProvider = ({ children, isPortal, theme }: { children?: Children; isPortal?: boolean; theme?: Theme }) => {
  const [loadedTheme, setLoadedTheme] = useState<Theme | undefined>(theme)

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

  useEffect(() => {
    if (isPortal) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'theme') {
          setLoadedTheme(e.newValue === 'dark' ? darkTheme : lightTheme)
        }
      }

      window.addEventListener('storage', handleStorageChange)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [isPortal])

  if (!loadedTheme) return null

  return MeoThemeProvider({ theme: loadedTheme, children }).render()
}

export const Wrapper = ({
  preloadedState,
  initialThemeMode,
  children,
  isPortal = false,
}: {
  preloadedState?: RootState
  initialThemeMode?: Theme['mode']
  children?: Children
  isPortal?: boolean
}) => {
  const initialStore = useMemo(() => initializeStore(preloadedState), [preloadedState])
  const theme = useMemo(() => {
    switch (initialThemeMode) {
      case 'dark':
        return darkTheme
      case 'light':
        return lightTheme
      default:
        return undefined
    }
  }, [initialThemeMode])

  return Node(StrictMode, {
    children: StyleRegistry({
      children: [
        CssBaseline(),
        ReduxProviderWrapper({
          store: initialStore,
          children: ThemeProvider({ theme, isPortal, children }),
        }),
      ],
    }),
  }).render()
}

export const PortalWrapper = Node(StrictMode, {
  children: Node(Wrapper, { isPortal: true }),
})
