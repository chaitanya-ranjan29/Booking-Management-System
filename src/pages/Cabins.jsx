import React, { useEffect } from 'react'
import { getCabins } from '../services/apiCabins'
import Row from '../ui/Row'
import Heading from '../ui/Heading'
import CabinTable from '../features/cabins/CabinTable'

function Cabins() {

  // useEffect(()=>{
  //   getCabins().then(data=>console.log("cabin data: ", data));
  // }, [])

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1' >All Cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <CabinTable/>
    </>
  )
}

export default Cabins