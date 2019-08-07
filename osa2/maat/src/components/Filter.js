import React from 'react'

const Filter = ({ filter, handleChange }) =>
<div>
  find countries <input
    value={filter}
    onChange={handleChange}
    />
</div>

export default Filter