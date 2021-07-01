import React from 'react'
import { connect } from 'react-redux' 
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return <div style={style}>
    Filter <input type="text" onChange={handleChange} /> 
  </div>
}

const ConnectedFilter = connect(null, { filterChange })(Filter)
export default ConnectedFilter
