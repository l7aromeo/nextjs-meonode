'use client'
import { Children, Node, Theme, ThemeProvider as MeoThemeProvider } from '@meonode/ui'
import { initializeStore, ReduxProviderWrapper, RootState } from '@src/redux/store'
import { StrictMode, useEffect, useMemo, useState } from 'react'
import { CssBaseline } from '@meonode/mui'
import darkTheme from '@src/constants/themes/darkTheme'
import lightTheme from '@src/constants/themes/lightTheme'
import { StyleRegistry } from '@meonode/ui/nextjs-registry'

const ThemeProvider = ({ children, isPortal, theme }: { children?: Children; isPortal?: boolean; theme?: Theme }) => {
  const [loadedTheme, setLoadedTheme] = useState<Theme>(() => {
    if (theme) return theme

    const stored = localStorage.getItem('theme')
    return stored === 'dark' ? darkTheme : lightTheme
  })

  useEffect(() => {
    if (isPortal) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'theme') {
          setLoadedTheme(e.newValue === 'dark' ? darkTheme : lightTheme)
        }
      }

      // Listen for changes from other tabs/windows
      window.addEventListener('storage', handleStorageChange)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [isPortal])

  return MeoThemeProvider({ theme: loadedTheme, children }).render()
}

export const Wrapper = ({
  preloadedState,
  initialTheme,
  children,
  isPortal = false,
}: {
  preloadedState?: RootState
  initialTheme?: Theme
  children?: Children
  isPortal?: boolean
}) => {
  const initialStore = useMemo(() => initializeStore(preloadedState), [preloadedState])

  return Node(StrictMode, {
    children: StyleRegistry({
      children: [
        CssBaseline(),
        ReduxProviderWrapper({
          store: initialStore,
          children: Node(ThemeProvider, { theme: initialTheme, isPortal, children }),
        }),
      ],
    }),
  }).render()
}

export const PortalWrapper = Node(StrictMode, {
  children: Node(Wrapper, { isPortal: true }),
})
