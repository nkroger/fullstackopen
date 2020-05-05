import React from 'react'

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notify notify-error">
            {message}
        </div>
    )
}

const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notify notify-success">
            {message}
        </div>
    )
}
export default {
    ErrorNotification,
    SuccessNotification
}