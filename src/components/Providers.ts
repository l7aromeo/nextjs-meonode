'use client'
import { Children, Node, type NodeElement, Theme, ThemeProvider } from '@meonode/ui'
import { initializeStore, ReduxProviderWrapper, RootState } from '@src/redux/store'
import { lazy, StrictMode, useEffect, useMemo, useState } from 'react'
import { CssBaseline } from '@meonode/mui'
import darkTheme from '@src/constants/themes/darkTheme'
import lightTheme from '@src/constants/themes/lightTheme'
const SnackbarProvider = lazy(() => import('notistack').then(module => ({ default: module.SnackbarProvider })))

// Main providers wrapper for the app
export const ProvidersWrapper = ({
  preloadedState,
  initialTheme,
  children,
}: {
  preloadedState: RootState
  initialTheme: Theme
  children: NodeElement
}) => {
  const initialStore = useMemo(() => initializeStore(preloadedState), [preloadedState])

  return Node(StrictMode, {
    children: [
      CssBaseline(),
      ReduxProviderWrapper({
        store: initialStore,
        children: ThemeProvider({
          theme: initialTheme,
          children: Node(SnackbarProvider, {
            domRoot: document.body,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            maxSnack: 3,
            children,
          }),
        }),
      }),
    ],
  }).render()
}

const PortalThemeProvider = ({ children }: { children?: Children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem('theme')
    return stored === 'dark' ? darkTheme : lightTheme
  })

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        setTheme(e.newValue === 'dark' ? darkTheme : lightTheme)
      }
    }

    // Listen for changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return ThemeProvider({ theme, children }).render()
}

// For portals or modals that are outside the main app tree
export const PortalProviders = Node(StrictMode, {
  children: ReduxProviderWrapper({
    store: initializeStore(),
    children: Node(PortalThemeProvider),
  }),
})
