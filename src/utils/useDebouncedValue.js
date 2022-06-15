import { useEffect, useState } from 'react'

function useDebouncedValue(value, wait) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), wait)
    return () => clearTimeout(id)
  }, [value, wait])
  
  return debouncedValue
}

export default useDebouncedValue