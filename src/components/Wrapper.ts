'use client'
import { Children, Node, PortalHost, PortalProvider, ThemeProvider } from '@meonode/ui'
import { StrictMode, useMemo } from 'react'
import { CssBaseline } from '@meonode/mui'
import { themeConfig } from '@src/constants/themes/config'
import { themeTokens } from '@src/constants/themes/tokens'
import { initializeStore, ReduxProvider, RootState } from '@src/redux/store'

/*
 * No `themeMode` prop any more.
 *
 * It used to arrive from the server, which read it from a cookie -- so the
 * document depended on who asked for it and two readers could never share a
 * cached copy. The mode is applied by `data-theme` on `<html>`, written before
 * the first paint by the script in `src/app/layout.ts`, and the provider seeds
 * itself from there. The markup is the same for everyone.
 */
export const Wrapper = ({
  preloadedState,
  children,
}: {
  preloadedState?: Partial<RootState>
  children?: Children
  isPortal?: boolean
}) => {
  const store = useMemo(() => initializeStore(preloadedState), [preloadedState])

  return Node(StrictMode, {
    children: ReduxProvider({
      store,
      children: PortalProvider({
        children: [
          CssBaseline(),
          // The same literal the head script was given, so the two halves cannot
          // disagree about which modes exist.
          ThemeProvider({
            ...themeConfig,
            tokens: themeTokens,
            children: Array.isArray(children) ? children.concat(PortalHost()) : [children, PortalHost()],
          }),
        ],
      }),
    }),
  }).render()
}
