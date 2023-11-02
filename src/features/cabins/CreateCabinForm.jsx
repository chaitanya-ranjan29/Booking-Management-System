import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

import React from "react";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import FileInput from "../../ui/FileInput";


function CreateCabinForm({ cabinToEdit = {} }) {

  const {id: editId, ...editValues} = cabinToEdit;
  console.log('editvalue', editValues);

  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: editValues
  });

  const {errors} = formState;

  console.log("errors", errors);

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin Created");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (err)=> toast.error(err.message)
  })

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (err)=> toast.error(err.message)
  })
  
  
  function onSubmit(data) {
    // console.log("data", data);
    console.log("dataImage", data.image[0]);

    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId});
    else createCabin({...data, image: image});
  }

  const isWorking = isCreating || isEditing;

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" id="name" disabled={isWorking} {...register("name", {
          required: "This field is required"
        })} />
      </FormRow>
      
      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: 'Capacity should be atleast 1'
          }
        })} />
      </FormRow>
      
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Price should be atleast 1"
          }
        })} />
      </FormRow>
      
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || 
            "Discount should be less than Regular Price"
        })} />
      </FormRow>
      
      <FormRow label="Description" error={errors?.description?.message}>
        <textarea type="number" id="description" disabled={isWorking} {...register("description", {
          required: "This field is required"
        })} />
      </FormRow>
      
      <FormRow label="Cabin Photo">
        <FileInput id="image" accept="image/*" {...register("image", {
          required: isEditSession ? false : "This field is required"
        })} />
        {/* <Input type="file" id="image" accept="image/*" /> */}
      </FormRow>
      
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking} >{isEditSession ? 'Edit Cabin' : 'Create New Cabin'}</Button>
      </FormRow>
      
    </form>
  );
}

export default CreateCabinForm;
