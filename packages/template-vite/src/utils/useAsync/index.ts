// README: https://usehooks.com/useAsync/
// Hook
import { useCallback, useEffect, useState } from 'react'

// Hook
export const useAsync = <T>(asyncFunction: (value?: any) => Promise<T>, immediate = true) => {
  const [loading, setLoading] = useState<boolean | null>(null)
  const [data, setData] = useState<T | any>(null)
  const [error, setError] = useState(null)
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (value?: any) => {
      setLoading(true)
      setData(null)
      setError(null)
      return asyncFunction(value)
        .then((response) => {
          setData(response)
          setLoading(false)
        })
        .catch((error) => {
          setError(error)
          setLoading(false)
        })
    },
    [asyncFunction]
  )
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])
  return { execute, loading, data, error }
}
