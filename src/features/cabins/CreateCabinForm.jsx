import React from "react";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";

function CreateCabinForm() {

  const {register, handleSubmit, reset, getValues, formState} = useForm();

  const {errors} = formState;

  console.log("errors", errors);
  
  function onSubmit(data) {
    console.log("data", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />
      </FormRow>
      
      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: 'Capacity should be atleast 1'
          }
        })} />
      </FormRow>
      
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Price should be atleast 1"
          }
        })} />
      </FormRow>
      
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || 
            "Discount should be less than Regular Price"
        })} />
      </FormRow>
      
      <FormRow label="Description" error={errors?.description?.message}>
        <textarea type="number" id="description" {...register("description", {
          required: "This field is required"
        })} />
      </FormRow>
      
      <FormRow label="Cabin Photo">
        <Input type="file" id="image" accept="image/*" />
      </FormRow>
      
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Add Cabin</Button>
      </FormRow>
      
    </form>
  );
}

export default CreateCabinForm;
