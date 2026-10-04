# Pranya’s Stuff — updated gallery

Open `index.html` in a modern browser. No installation or build is needed; the local artwork gallery works offline. Instagram and Google Forms links require internet access.

## What changed

- A complete responsive gallery with the artist’s own paintings, portraits, sketches and illustrations.
- 29 distinct pieces curated from the adjacent Paintings folder; alternate photographs consolidated.
- Search and category filters work together, with result counts and an empty state.
- Artwork viewer supports previous/next, left/right arrows, Escape, native modal focus containment and returning focus to the artwork.
- Mobile navigation, semantic sections, skip link, visible keyboard focus, descriptive image text and reduced-motion support.
- Local WebP assets in 480, 960 and 1600 pixel versions, responsive image selection, lazy loading and reserved image space.
- Existing Instagram account and Google enquiry form preserved; the form opens on request, avoiding an embedded third-party page on initial load.

## Editing

Edit text and section links in `index.html`, styling in `styles.css`, artwork display titles/categories/descriptions in `artworks.js`, and interactions in `gallery.js`. `asset-manifest.json` maps each displayed work to its original photograph. Display titles are descriptive labels rather than verified original artist titles. Sizes, prices and availability are intentionally not invented.

`gallery.html`, `contact.html` and `Pranyas_Stuff_Gallery.html` preserve the old entry-page names and lead to the updated site. `original-project/` contains an untouched copy of the supplied HTML and Figma/React project for reference. It is not required to run the new site and can be excluded from deployment.

## Verification

JavaScript syntax and local asset checks passed. A local interaction harness checked combined filtering/search, empty state/reset, viewer open/close, previous/next and arrow navigation, focus restoration, enquiry navigation, and mobile menu dismissal.

Browser rendering was inspected at 1440 × 1000 and 390 × 844: no horizontal overflow; desktop three-column and mobile single-column gallery; artwork images loaded. Browser-driven click/typing checks were inconclusive because the browser automation targeted the wrong controls; the interaction harness covers those behaviours, but a manual click/keyboard pass is still recommended. External enquiry submission and Instagram availability were not tested.

All three optimized image sizes together total approximately 11.8 MB, compared with 113 MB for the 29 source photographs. Individual gallery cards load only their selected size; full-view assets load when requested.

## Hosting

Upload the HTML files, CSS, JavaScript, manifest and `assets/` together to any static web host. Keep their relative paths. There is no checkout, backend or payment flow; enquiries use the original Google Form or Instagram.
