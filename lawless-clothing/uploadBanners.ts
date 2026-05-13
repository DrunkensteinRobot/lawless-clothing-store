import { getCliClient } from 'sanity/cli'
import fs from 'fs'

const client = getCliClient()
const sourceFile = 'C:\\Users\\KHASHANE MUELETSHEDZ\\Documents\\WebProjects\\Lawless Clothing\\camera shoot\\IMG_2693.jpg';

async function createSummerBanner() {
  console.log('Uploading IMG_2693.jpg for Summer Collection Banner...');
  
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
    
    const doc = {
      _type: 'heroBanner',
      title: `SUMMER COLLECTION`,
      subtitle: 'EXPLORE THE LATEST SUMMER DROP.',
      buttonText: 'SHOP SUMMER',
      buttonLink: '/collections',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      }
    };
    
    const created = await client.create(doc);
    console.log(`Hero Banner created! ID: ${created._id}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

createSummerBanner();
