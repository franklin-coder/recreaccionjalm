import { supabase } from './supabase'

/**
 * Uploads an image file to Supabase Storage
 * @param file - The image file to upload
 * @param folder - The folder path in the bucket (e.g., 'inflables', 'paquetes')
 * @returns The public URL of the uploaded image
 */
export async function uploadImageToStorage(
  file: File,
  folder: string = 'products'
): Promise<string> {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
}

/**
 * Uploads multiple image files to Supabase Storage
 * @param files - Array of image files to upload
 * @param folder - The folder path in the bucket
 * @returns Array of public URLs of the uploaded images
 */
export async function uploadMultipleImages(
  files: File[],
  folder: string = 'products'
): Promise<string[]> {
  try {
    const uploadPromises = files.map(file => uploadImageToStorage(file, folder))
    const urls = await Promise.all(uploadPromises)
    return urls
  } catch (error) {
    console.error('Error uploading multiple images:', error)
    throw new Error('Failed to upload images')
  }
}

/**
 * Deletes an image from Supabase Storage
 * @param imageUrl - The public URL of the image to delete
 */
export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/product-images/')
    if (pathParts.length < 2) {
      throw new Error('Invalid image URL')
    }
    const filePath = pathParts[1]

    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath])

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}
