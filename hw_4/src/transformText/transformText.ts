import fs from 'fs';

export function transformTextToUppercase(inputFilePath: string, outputFilePath: string): void {
    const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(outputFilePath);

    readStream.on('data', (chunk: string) => {
        writeStream.write(chunk.toUpperCase());
    });

    readStream.on('end', () => {
        readStream.close();
        writeStream.close();
    });

    readStream.on('error', (error: Error) => {
        console.error('Error reading input file:', error);
    });

    writeStream.on('error', (error: Error) => {
        console.error('Error writing to output file:', error);
    });
}
