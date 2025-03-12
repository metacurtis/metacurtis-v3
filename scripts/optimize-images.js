// Simple script to optimize images
console.log("Optimizing images for production...");

// Placeholder script - Install sharp or other image optimization libraries
const glob = require("glob");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

async function optimizeImages() {
  try {
    const imageFiles = await glob.sync("./src/assets/**/*.{jpg,jpeg,png,gif}");

    for (const file of imageFiles) {
      const outputFile = file.replace(/\.(jpg|jpeg|png|gif)$/, ".webp");

      // Skip if already processed
      if (await fileExists(outputFile)) continue;

      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outputFile);

      console.log(`Optimized: ${file} → ${outputFile}`);
    }

    console.log("Image optimization complete!");
  } catch (error) {
    console.error("Image optimization failed:", error);
  }
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

optimizeImages();
