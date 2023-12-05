'use client'

import { createContext } from 'react'

export const AppContext = createContext({})

export default function AppContextProvider ({ children, adminSettings }) {
  console.log('adminSettings', adminSettings)

  return (
    <AppContext.Provider value={adminSettings}>{children}</AppContext.Provider>
  )
}
