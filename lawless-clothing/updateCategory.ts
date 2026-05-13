import { getCliClient } from 'sanity/cli'
import fs from 'fs'
import path from 'path'

const client = getCliClient()

const sourceFile = 'C:\\Users\\KHASHANE MUELETSHEDZ\\Documents\\WebProjects\\Lawless Clothing\\camera shoot\\IMG_2693.jpg';
const categoryId = 'f126ce12-e884-4d79-a9b0-dfa1b99a44cc';

async function updateCategory() {
  console.log('Uploading IMG_2693.jpg...');
  
  if (!fs.existsSync(sourceFile)) {
    console.error(`File not found: ${sourceFile}`);
    return;
  }

  const fileStream = fs.createReadStream(sourceFile);
  
  try {
    const asset = await client.assets.upload('image', fileStream, {
      filename: 'IMG_2693.jpg'
    });
    
    console.log(`Asset uploaded! ID: ${asset._id}`);
    
    // Patch the category document to include the image
    const result = await client
      .patch(categoryId)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      })
      .commit();
      
    console.log(`Category updated! ID: ${result._id}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

updateCategory();
