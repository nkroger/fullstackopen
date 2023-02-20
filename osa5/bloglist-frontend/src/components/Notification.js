import React from "react"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const ErrorNotification = () => {
  const message = useSelector((state) => {
    return state.notification.error
  })

  if (!message) return null

  return <Alert variant="error">{message}</Alert>
}

const SuccessNotification = () => {
  const message = useSelector((state) => state.notification.success)

  if (!message) return null

  return <Alert variant="success">{message}</Alert>
}

export default {
  ErrorNotification,
  SuccessNotification,
}
