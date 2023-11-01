import React from 'react'
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';


const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3/2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-weight: 600;
    font-family: 'Sono';
`;

const Discount = styled.div`
    font-weight: 500;
    font-family: 'Sono';
    color: var(--color-green-700);
`;



function CabinRow({cabin}) {

    const {id: cabinID, name, maxCapacity, regularPrice, discount, image} = cabin;

    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate} = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success('Cabin successfully deleted');
            //invalidate the queries
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            })
            //as soon as the mutation is successful we want to refetch the data;
        },
        onError: (error) => toast.error(error.message)
    })


  return (
    <TableRow role='row' >
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests </div>
        <Price> {formatCurrency(regularPrice)} </Price>
        <Discount> {formatCurrency(discount)} </Discount>
        <button disabled={isDeleting} onClick={()=> mutate(cabinID)} >Delete</button>
    </TableRow>
  )
}

export default CabinRow