const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const userUploadDir = 'C:/Users/ShivaSingh/.gemini/antigravity-ide/brain/d22e32a4-04a7-4652-aef4-ae14b66f550a/.user_uploaded';
const productsOutDir = path.join(__dirname, '../public/images/products');
const generalOutDir = path.join(__dirname, '../public/images/general');
const heroOutDir = path.join(__dirname, '../public/images/hero');

fs.mkdirSync(productsOutDir, { recursive: true });
fs.mkdirSync(generalOutDir, { recursive: true });
fs.mkdirSync(heroOutDir, { recursive: true });

async function processAll() {
  console.log('Generating high-precision crops and product assets...');

  // 1. Origami C-Block Side Table
  const sideTablePath = path.join(userUploadDir, 'media_1789804655477.jpg');
  await sharp(sideTablePath)
    .extract({ left: 0, top: 55, width: 460, height: 785 })
    .webp({ quality: 92 })
    .toFile(path.join(productsOutDir, 'origami-c-block-table.webp'));

  // 2. Apex Halo Executive Desk
  const haloDeskPath = path.join(userUploadDir, 'media_1789804695085.jpg');
  await sharp(haloDeskPath)
    .webp({ quality: 95 })
    .toFile(path.join(productsOutDir, 'apex-halo-desk-main.webp'));

  await sharp(haloDeskPath)
    .webp({ quality: 95 })
    .toFile(path.join(heroOutDir, 'hero-executive-desk.webp'));

  await sharp(haloDeskPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile(path.join(generalOutDir, 'og-default.jpeg'));

  // 3. Nova Prime Desk
  const novaPath = path.join(userUploadDir, 'media_1789804695226.jpg');
  // Full brochure
  await sharp(novaPath)
    .webp({ quality: 95 })
    .toFile(path.join(productsOutDir, 'nova-prime-desk-spec.webp'));
  // Main 3D desk render
  await sharp(novaPath)
    .extract({ left: 0, top: 70, width: 540, height: 395 })
    .webp({ quality: 92 })
    .toFile(path.join(productsOutDir, 'nova-prime-desk-main.webp'));
  // Dimensions diagram (top right: x 540 to 1024, y 50 to 450)
  await sharp(novaPath)
    .extract({ left: 540, top: 50, width: 480, height: 380 })
    .webp({ quality: 90 })
    .toFile(path.join(productsOutDir, 'nova-prime-desk-dimensions.webp'));
  // Exploded view + frame structure (bottom left)
  await sharp(novaPath)
    .extract({ left: 10, top: 715, width: 500, height: 180 })
    .webp({ quality: 90 })
    .toFile(path.join(productsOutDir, 'nova-prime-desk-exploded.webp'));

  // 4. Infini X Desk
  const infiniXPath = path.join(userUploadDir, 'media_1789804695111.jpg');
  // Full brochure
  await sharp(infiniXPath)
    .webp({ quality: 95 })
    .toFile(path.join(productsOutDir, 'infini-x-desk-spec.webp'));
  // Main 3D desk render
  await sharp(infiniXPath)
    .extract({ left: 0, top: 60, width: 510, height: 400 })
    .webp({ quality: 92 })
    .toFile(path.join(productsOutDir, 'infini-x-desk-main.webp'));
  // Dimensions diagram (top right)
  await sharp(infiniXPath)
    .extract({ left: 565, top: 50, width: 450, height: 370 })
    .webp({ quality: 90 })
    .toFile(path.join(productsOutDir, 'infini-x-desk-dimensions.webp'));
  // Exploded view + frame structure (bottom left)
  await sharp(infiniXPath)
    .extract({ left: 10, top: 635, width: 480, height: 175 })
    .webp({ quality: 90 })
    .toFile(path.join(productsOutDir, 'infini-x-desk-exploded.webp'));

  // 5. Infinity Curve Bed
  const bedPath = path.join(userUploadDir, 'media_1789804695217.jpg');
  // Full brochure
  await sharp(bedPath)
    .webp({ quality: 95 })
    .toFile(path.join(productsOutDir, 'infinity-curve-bed-spec.webp'));
  // Main 3D bed render
  await sharp(bedPath)
    .extract({ left: 0, top: 70, width: 545, height: 410 })
    .webp({ quality: 92 })
    .toFile(path.join(productsOutDir, 'infinity-curve-bed-main.webp'));
  // Dimensions diagram (top right)
  await sharp(bedPath)
    .extract({ left: 545, top: 50, width: 470, height: 390 })
    .webp({ quality: 90 })
    .toFile(path.join(productsOutDir, 'infinity-curve-bed-dimensions.webp'));
  // Exploded view + frame structure (bottom left)
  await sharp(bedPath)
    .extract({ left: 10, top: 720, width: 460, height: 200 })
    .webp({ quality: 90 })
    .toFile(path.join(productsOutDir, 'infinity-curve-bed-exploded.webp'));

  // 6. Brand Logo SVG & PNG
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="128" viewBox="0 0 512 128">
    <rect width="512" height="128" fill="#0F0F10" rx="16"/>
    <g transform="translate(24, 24)">
      <rect x="0" y="8" width="64" height="64" rx="8" fill="none" stroke="#D4A843" stroke-width="6"/>
      <path d="M8 52 L56 28" stroke="#E0BE6A" stroke-width="5" stroke-linecap="round"/>
      <path d="M8 28 L56 52" stroke="#E0BE6A" stroke-width="5" stroke-linecap="round"/>
      <circle cx="32" cy="40" r="5" fill="#D4A843"/>
    </g>
    <text x="110" y="66" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="38" letter-spacing="3" fill="#FFFFFF">PHARNEECHAR</text>
    <text x="112" y="90" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="14" letter-spacing="5" fill="#D4A843">ARCHITECTURAL METAL FURNITURE</text>
  </svg>`;

  fs.writeFileSync(path.join(generalOutDir, 'logo.svg'), logoSvg);
  await sharp(Buffer.from(logoSvg))
    .png()
    .toFile(path.join(generalOutDir, 'logo.png'));

  console.log('Successfully generated all clean product images, diagrams, and spec sheets!');
}

processAll().catch(console.error);
