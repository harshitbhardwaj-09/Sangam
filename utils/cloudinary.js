import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (filePath) => {
    try {
        console.log(`Uploading file to Cloudinary: ${filePath}`);
        const result = await cloudinary.v2.uploader.upload(filePath, {
            resource_type: 'raw',
            format: 'pdf'
        });
        console.log('Upload result:', result);
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};