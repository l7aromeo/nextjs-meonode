import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createNode } from '@meonode/ui'
import { setupListeners } from '@reduxjs/toolkit/query'
import appSlice, { AppState, setIsMobile } from '@src/redux/slice/app.slice'

export interface RootState {
  app: AppState
}

let globalStore: Store<RootState, UnknownAction> | undefined

export const initializeStore = (preloadedState?: RootState): Store<RootState, UnknownAction> => {
  if (!globalStore) {
    globalStore = configureStore({
      reducer: {
        app: appSlice,
      },
      preloadedState,
    })
    if (typeof window !== 'undefined') {
      setupListeners(globalStore.dispatch)
    }
  } else if (preloadedState) {
    globalStore.dispatch(setIsMobile(preloadedState.app.isMobile))
  }

  return globalStore
}

export type AppDispatch = ReturnType<typeof initializeStore>['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const ReduxProviderWrapper = createNode(Provider)
