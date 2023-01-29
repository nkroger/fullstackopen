import { connect } from 'react-redux'

const Notification = (props) => {
  //const { message, visible } = useSelector( state => state.notification )

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: props.visible ? '' : 'none'
  }
  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { message, visible } = state.notification
  return {
    message,
    visible
  }
}

export default connect(
  mapStateToProps
)(Notification)
