import React from "react"
import { useSelector } from "react-redux"

const ErrorNotification = () => {
  const message = useSelector((state) => {
    return state.notification.error
  })

  if (!message) return null

  return <div className="notify notify-error">{message}</div>
}

const SuccessNotification = () => {
  const message = useSelector((state) => state.notification.success)

  if (!message) return null

  return <div className="notify notify-success">{message}</div>
}

export default {
  ErrorNotification,
  SuccessNotification,
}
