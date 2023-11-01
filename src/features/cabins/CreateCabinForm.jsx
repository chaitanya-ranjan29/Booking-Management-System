import React from "react";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

function CreateCabinForm() {
  return (
    <form>
      <FormRow label="Cabin name">
        <Input type="text" id="name" />
      </FormRow>
      
      <FormRow label="Max Capacity">
        <Input type="number" id="maxCapacity" />
      </FormRow>
      
      <FormRow label="Regular Price">
        <Input type="number" id="regularPrice" />
      </FormRow>
      
      <FormRow label="Discount">
        <Input type="number" id="discount" defaultValue={0} />
      </FormRow>
      
      <FormRow label="Description">
        <textarea type="number" id="description" />
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
