const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const { pipeline } = require('stream');

// Function to decompress a zip file
const decompress = (zipFile, outDir) => {
  return fs.createReadStream(zipFile) // Read the zip file
    .pipe(unzipper.Extract({ path: outDir })) // Extract it to the output directory
    .promise() // Use a promise to handle asynchronous behavior
    .then(() => console.log('Decompression succeeded!'))
    .catch(err => console.error('Decompression failed:', err));
};

// Example usage: Decompress a zip file
const zipFilePath = path.join(__dirname, 'folder-compressed.zip'); // Zip file to decompress
const outputFolderPath = path.join(__dirname, 'uncompressed-folder'); // Where to extract

decompress(zipFilePath, outputFolderPath);


// const decompressFile = (inputFile, outputFile) => {
//   const gunzip = zlib.createGunzip(); // Create gunzip transform stream
//   const source = fs.createReadStream(inputFile); // Read from the input file
//   const destination = fs.createWriteStream(outputFile); // Write to the output file

//   // Pipe the streams together and handle errors
//   pipeline(source, gunzip, destination, (err) => {
//     if (err) {
//       console.error('File decompression failed:', err);
//     } else {
//       console.log('File decompression succeeded!');
//     }
//   });
// };

// // Example usage: Decompress a file
// decompressFile('largefile.txt.gz', 'largefile-decompressed.txt');