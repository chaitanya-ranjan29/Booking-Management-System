import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  // query the supabase client

  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  // query the supabase client

  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  // cabin/008.jpeg - to remove the creation of new folder, we are removing all the '/' if any from the fileName
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // https://bxbsrlxqwzpstymxxhgs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // reconstructing the imagePath using the above url
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create a cabin

  let query = supabase.from('cabins') ;

  //Create
  if(!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //Edit
  if(id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //2. upload the image

  const { storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete the cabin if there was an error uploading the image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
