const Notification = ({ message, isSuccess }) => {
    if (message === null || isSuccess === null) {
        return null
    }

console.log(`isSuccess == ${isSuccess}`)

    if (isSuccess) {
        return (
            <div className="success">
                {message}
            </div>
        )
    } else {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Notification
