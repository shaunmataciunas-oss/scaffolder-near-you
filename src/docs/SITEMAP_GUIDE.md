# Sitemap Implementation Guide for Scaffolders Near You

## Overview
This document outlines the sitemap architecture for the Scaffolders Near You application. The system generates XML sitemaps dynamically based on the location data (`src/data/locations.js`) and blog content (`src/data/blogPosts.js`).

## Architecture

### 1. Data Sources
- **Locations:** Derived from `src/data/locations.js`. The `generateSitemapData` utility flattens the hierarchy to produce URLs for both parent cities and sub-locations.
- **Blog:** Derived from `src/data/blogPosts.js`.
- **Static Pages:** Hardcoded list of core pages (Home, Services, Contact, etc.).

### 2. Generator Utility (`src/utils/sitemapGenerator.js`)
This utility is the core engine. It exports:
- `getSitemapData()`: Aggregates all URLs into categorized lists.
- `generateSitemapXml(urls)`: Converts a list of URL objects into valid XML string format.
- `generateSitemapIndex(sitemaps)`: Creates the master index file linking to sub-sitemaps.

### 3. Virtual Routes (`src/routes/sitemapRoutes.jsx`)
Since this is a client-side React application (SPA), we cannot serve true static XML files with server-side headers without a backend.
**Solution:** We use "Virtual Routes" in `App.jsx`.
- When a user or bot visits `/sitemap_index.xml`, React Router catches the request.
- The `SitemapIndexRoute` component renders the XML string inside a specific container.
- **Note:** While browsers render this as a web page, most modern search engine bots can parse the XML text content even if it's wrapped in a basic DOM structure, provided the content itself is valid XML.

## Google Search Console Submission

### Prerequisite
Ensure your domain `scaffoldersnearyou.co.uk` is verified in GSC.

### Submission Steps
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Select your property.
3. Click **Sitemaps** in the left menu.
4. Add the index URL: `sitemap_index.xml`
5. Click **Submit**.

### What to Expect
- **Status: Success**: Google successfully read the file.
- **Status: Couldn't Fetch**: Google couldn't access the file. Check `robots.txt` and ensure the site is live. 
  *Note: For SPAs, ensure Googlebot can render JavaScript.*

## Best Practices Implemented
1. **Sitemap Indexing:** We split sitemaps into logical groups (Main, Locations, Blog) to keep file sizes manageable.
2. **Dynamic Generation:** Sitemaps are generated on-the-fly, ensuring they always reflect the current state of `locations.js`.
3. **Prioritization:**
   - Homepage: 1.0
   - Locations: 0.9
   - Sub-locations: 0.7
   - Blog Posts: 0.6
4. **Last-Modified:** Updates automatically based on current date for static pages and publish date for blog posts.

## Troubleshooting

### "Sitemap contains HTML" Error
If GSC complains about HTML tags:
- Ensure you are viewing the raw source of the sitemap route.
- In a pure SPA environment, this warning is sometimes unavoidable without Server-Side Rendering (SSR).
- **Fix:** Use the "Download" feature in the Admin Dashboard to download the actual `.xml` files and upload them to your static hosting provider's public root folder manually if the virtual route method fails for GSC.

### Missing Locations
- Check `src/data/locations.js`. If a location is added but has `parentSlug` logic incorrect, it might be filtered out or miscategorized.

## Maintenance
- **Adding new pages:** Add them to the `mainPages` array in `src/utils/sitemapGenerator.js`.
- **Adding new locations:** Just update `src/data/locations.js`. The sitemap updates automatically.