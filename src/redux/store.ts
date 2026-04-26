import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import appSlice from '@src/redux/slice/app.slice'
import { createNode } from '@meonode/ui'
import { Provider } from 'react-redux'

export const initializeStore = (preloadedState?: object) => {
  const store = configureStore({
    reducer: {
      app: appSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat
        // your middleware
        (),
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export type RootState = ReturnType<ReturnType<typeof initializeStore>['getState']>
export type AppDispatch = ReturnType<typeof initializeStore>['dispatch']
export const ReduxProvider = createNode(Provider)
