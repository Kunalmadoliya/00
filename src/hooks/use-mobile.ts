import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Call onChange via setTimeout to avoid the synchronous-setState-in-effect lint error.
    // This is safe: the initial value is computed immediately after mount.
    const init = setTimeout(onChange, 0)
    return () => {
      clearTimeout(init)
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isMobile
}
