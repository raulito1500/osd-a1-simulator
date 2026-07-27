// Locally cached images used by the "Vorgeladenes Bild verwenden" button so
// practicing doesn't spend Gemini image-generation quota on every attempt.
// To add one: drop the file into public/images/cached/ and add its filename here.
export const CACHED_IMAGES = [
    'download_1.png',
    'download_2.png',
    'download_3.png',
];

export const getRandomCachedImage = () => {
    if (CACHED_IMAGES.length === 0) return null;
    const file = CACHED_IMAGES[Math.floor(Math.random() * CACHED_IMAGES.length)];
    return `${process.env.PUBLIC_URL}/images/cached/${file}`;
};
