import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector( state => state.filter )
  const handleChange = (event) => {
    event.preventDefault()
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      Filter <input value={filter}
             onChange={handleChange}
             />
    </div>
  )
}

export default Filter
