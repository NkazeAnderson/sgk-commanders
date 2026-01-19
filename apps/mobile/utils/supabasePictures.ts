import { decode } from "base64-arraybuffer";
import * as FileSystem from 'expo-file-system';
import { ImagePickerAsset } from "expo-image-picker";
import { supabase as sharedSupabase } from "sgk-commanders-shared";
import { storageBuckets } from "sgk-commanders-shared/dist/constants";

const supabase = sharedSupabase.supabase

/**
 * Reads a file from a given URI and returns its base64-encoded string.
 * @param uri The file URI from Expo ImagePicker.
 * @returns The base64 string of the file contents.
 */
export async function getBase64FromUri(uri: string): Promise<string> {
    const base64 = await new FileSystem.File(uri).base64()
    console.log({base64});
    
    return base64
}


/**
 * Uploads a base64-encoded image to the 'public-images' bucket in Supabase Storage.
 * @param asset The base64-encoded image string (data URL or raw base64).
 * @param fileName The name to save the file as (e.g., 'image.png').
 * @returns The public URL of the uploaded image or an error.
 */
export async function uploadBase64ImageToSupabase(
    asset: ImagePickerAsset, userId: string
): Promise<string> {
   
  const fileName = `${userId}/${new Date().getTime()}_${asset.fileName ?? "file"}.${asset.mimeType?.split("/")[1]}`
   const base64 = await getBase64FromUri(asset.uri)
    const { error } = await supabase.storage
        .from(storageBuckets.public)
        .upload(fileName, decode(base64), {
            contentType: asset.mimeType,
            upsert: true,
        });

    if (error) {
        throw new Error("Failed to upload");
        ;
    }
    const { data:{publicUrl} } = supabase.storage.from(storageBuckets.public).getPublicUrl(fileName);
    return publicUrl 
}