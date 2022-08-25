
import React, { useState }from 'react'
import { Stack,Rating} from '@mui/material'

const Ratings = ({ratings}) => {
  return (
    <div>
        <Rating value={ratings} precision={0.5} readOnly size='medium'></Rating>
    </div>
  )
}

export default Ratings