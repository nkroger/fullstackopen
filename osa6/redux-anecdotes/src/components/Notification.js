import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, visible } = useSelector( state => state.notification )

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visible ? '' : 'none'
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
