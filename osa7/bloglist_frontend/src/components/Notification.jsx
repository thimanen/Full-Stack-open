import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  if (!notification.body) {
    return
  }

  return (
    <div>
      {notification.type === "info" && (
        <div className="success">{notification.body}</div>
      )}

      {notification.type === "error" && (
        <div className="error">{notification.body}</div>
      )}
    </div>
  )
}
export default Notification
