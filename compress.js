const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const { pipeline } = require('stream');

// Function to compress a file or folder
const compress = (source, out) => {
  const archive = archiver('zip', { zlib: { level: 9 } }); // Create a zip archive with highest compression
  const stream = fs.createWriteStream(out); // Output stream for the compressed file

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false) // If it's a directory, compress the entire folder
      .on('error', err => reject(err)) // Handle errors
      .pipe(stream); // Pipe the archive data to the output stream

    stream.on('close', () => resolve()); // Resolve once the stream is closed

    archive.finalize(); // Finalize the archive (no more data will be added)
  });
};

// Example usage: Compress a folder or file
const sourcePath = path.join(__dirname, 'folderName'); // Folder to compress
const outputZip = path.join(__dirname, 'folder-compressed.zip'); // Output zip file

compress(sourcePath, outputZip)
  .then(() => console.log('Folder compression succeeded!'))
  .catch(err => console.error('Compression failed:', err));

//   const compressFile = (inputFile, outputFile) => {
//     const gzip = zlib.createGzip(); // Create gzip transform stream
//     const source = fs.createReadStream(inputFile); // Read from the input file
//     const destination = fs.createWriteStream(outputFile); // Write to the output file
  
//     // Pipe the streams together and handle errors
//     pipeline(source, gzip, destination, (err) => {
//       if (err) {
//         console.error('File compression failed:', err);
//       } else {
//         console.log('File compression succeeded!');
//       }
//     });
//   };
  
//   // Example usage: Compress a file
//   compressFile('largefile.txt', 'largefile.txt.gz');