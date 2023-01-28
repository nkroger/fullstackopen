import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      Filter <input value={props.filter}
        onChange={handleChange}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const filter = state.filter
  return { filter }
}

const mapDispatchToProps = {
  setFilter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
