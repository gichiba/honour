import { useReducer, createContext, useMemo, useEffect } from 'react'
import { useNetwork } from 'wagmi'
import SwitchNetworkModal from '../components/SwitchNetwork'

export const SwitchNetworkContext = createContext()

const initial = { modal: false }

const reducer = (state, action) => {
  switch (action.type) {
    case 'modal': {
      return { ...state, modal: action.payload }
    }
    default: return initial
  }
}
export const SwitchNetworkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial)
  const { chain } = useNetwork()

  const value = useMemo(() => {
    return {
      state, dispatch
    }
  }, [state, dispatch])

  useEffect(() => {
    if (!chain) {
      dispatch({ type: 'modal', payload: false })
    } else if (chain?.id !== 10) {
      dispatch({ type: 'modal', payload: true })
    } else {
      dispatch({ type: 'modal', payload: false })
    }
  }, [chain, dispatch])

  return (
    <SwitchNetworkContext.Provider value={value}>
      {state.modal && <SwitchNetworkModal />}
      {children}
    </SwitchNetworkContext.Provider>
  )
}
