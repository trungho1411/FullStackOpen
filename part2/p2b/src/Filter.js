import React from 'react'

const Filter = ({search, handleSearch}) => {
  return (
    <div>
      <p>Filter shown with </p>
      <input
        type='text'
        onChange={handleSearch}
        value={search}
      />
    </div>

  )
}

export default Filter