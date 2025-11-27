const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryKey = process.env.CLOUDINARY_API_KEY;
const cloudinarySecret = process.env.CLOUDINARY_API_SECRET;

console.log('Cloudinary Config Check:');
console.log('Cloud Name exists:', !!cloudinaryName);
console.log('API Key exists:', !!cloudinaryKey);
console.log('API Secret exists:', !!cloudinarySecret);
