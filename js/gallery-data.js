/*
HOW TO ADD NEW PHOTOS

1. Upload image to correct folder
   assets/gallery/site/
   assets/gallery/steel/
   assets/gallery/roofing/

2. Add entry below

Example:

{
  category: "site",
  src: "assets/gallery/site/new-image.jpeg",
  type: "image"
}

3. Save and push to GitHub
*/

const galleryItems = [
  {
    category: "site",
    src: "assets/site/site-01.jpeg",
    type: "image",
  },

  {
    category: "site",
    src: "assets/site/site-02.jpeg",
    type: "image",
  },

  {
    category: "steel",
    src: "assets/steel/steel-01.jpeg",
    type: "image",
  },

  {
    category: "roofing",
    src: "assets/roofing/roofing-01.jpeg",
    type: "image",
  },

  {
    category: "videos",
    src: "assets/videos/steel-work-01.mp4",
    type: "video",
  },
];
