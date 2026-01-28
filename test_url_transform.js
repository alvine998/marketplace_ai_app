const testUrl =
  'https://storage.googleapis.com/pretty-shop-a071c.firebasestorage.app/f5cfc347-0535-4ac3-a83f-254d8a493eac.png';

function transformUrl(originalUrl) {
  if (originalUrl && originalUrl.includes('storage.googleapis.com')) {
    try {
      const url = new URL(originalUrl);
      const pathParts = url.pathname.split('/');
      if (pathParts.length >= 3) {
        const bucket = pathParts[1];
        const objectPath = pathParts.slice(2).join('/');
        const encodedObjectPath = encodeURIComponent(objectPath);
        return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedObjectPath}?alt=media`;
      }
    } catch (e) {
      console.error('Error transforming URL:', e);
    }
  }
  return originalUrl;
}

const transformed = transformUrl(testUrl);
console.log('Original:', testUrl);
console.log('Transformed:', transformed);
