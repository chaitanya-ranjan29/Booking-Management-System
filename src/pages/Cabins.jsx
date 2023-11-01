import React, { useEffect, useState } from 'react'
import { getCabins } from '../services/apiCabins'
import Row from '../ui/Row'
import Heading from '../ui/Heading'
import CabinTable from '../features/cabins/CabinTable'
import Button from '../ui/Button'
import CreateCabinForm from '../features/cabins/CreateCabinForm'

function Cabins() {

  // useEffect(()=>{
  //   getCabins().then(data=>console.log("cabin data: ", data));
  // }, [])

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1' >All Cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable/>

        <Button onClick={()=>setShowForm(!showForm)} >Add new Cabin</Button>
        {!showForm && <CreateCabinForm /> }
      </Row>
    </>
  )
}

export default Cabins