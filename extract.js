const fs = require('fs');

const pdfPath = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\ea521e40-b52f-4b1e-86c4-1f0aeb1328cd\\.user_uploaded\\media_1789463574377.pdf';
const outPath = 'C:\\Users\\HP\\OneDrive\\Documents\\GitHub\\project-hub\\assets\\images\\profile.jpg';

const buffer = fs.readFileSync(pdfPath);

const startMarker = Buffer.from([0xFF, 0xD8, 0xFF]);
const endMarker = Buffer.from([0xFF, 0xD9]);

let startIdx = buffer.indexOf(startMarker);
if (startIdx !== -1) {
    let endIdx = buffer.indexOf(endMarker, startIdx);
    if (endIdx !== -1) {
        const imgBuffer = buffer.subarray(startIdx, endIdx + 2);
        fs.writeFileSync(outPath, imgBuffer);
        console.log('Image extracted successfully.');
    } else {
        console.log('End marker not found.');
    }
} else {
    console.log('Start marker not found.');
}
