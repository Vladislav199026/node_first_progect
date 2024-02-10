import express from 'express';
import routers from './server';
import { processImage } from './downloadImage';
import { fileName, imageUrl } from './mockData';

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use('/', routers);

processImage(imageUrl, fileName)
  .then(() => {
    console.log('Image processing completed successfully.');
  })
  .catch((error) => {
    console.error('Error processing image:', error);
  });

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
