import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function main() {
  try {
    const categoryId = '4e0ca6d6-cb96-484b-906d-f76dac603428';
    const products = await client.fetch(`*[_type == "product" && category._ref == $categoryId]._id`, { categoryId });
    
    for (const productId of products) {
      await client.patch(productId).unset(['category']).commit();
      console.log(`Unset category reference on product ${productId}`);
    }

    await client.delete(categoryId);
    console.log('Deleted category "The Project"');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
