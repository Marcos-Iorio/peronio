import { useEffect } from "react"

const HoverUpdater = ({ locale, payload, setHoverValue, setHoverDate }) => {
    useEffect(() => {
      setHoverValue(payload.value)
      setHoverDate(
        payload.time.toLocaleString(locale, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    }, [locale, payload.value, payload.time, setHoverValue, setHoverDate])
  
    return null
  }

  export default HoverUpdater