import fs from 'fs';
import axios from 'axios';

export async function processImage(imageUrl: string, fileName: string): Promise<void> {
  return axios.get(imageUrl, { responseType: 'arraybuffer' })
      .then((response) => {
          const imageData = response.data;
          fs.writeFileSync(fileName, imageData, 'binary');
          console.log('Image saved successfully.');
      })
      .catch((error) => {
          console.error('Error downloading image:', error);
          throw error;
      });
}
