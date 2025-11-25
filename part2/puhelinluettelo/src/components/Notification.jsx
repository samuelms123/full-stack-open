import { useEffect } from 'react'

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  const className = type === 'error' ? 'alert-error' : 'alert-success'

  return <div className={className}>{message}</div>
}

export default Notification
