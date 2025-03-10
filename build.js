const fs = require('fs-extra');
const path = require('path');
const htmlMinifier = require('html-minifier');
const UglifyJS = require('uglify-js');

// Configuration
const srcDir = path.join(__dirname, 'sonata', 'src');
const distDir = path.join(__dirname, 'dist');

// Clean dist directory
console.log('Cleaning dist directory...');
fs.emptyDirSync(distDir);

// Copy all files from src to dist
console.log('Copying files...');
fs.copySync(srcDir, distDir);

// Copy index.html to the root of dist
fs.copyFileSync(
  path.join(srcDir, 'templates', 'index.html'),
  path.join(distDir, 'index.html')
);

// Add this to your build.js file after the copying files section
console.log('Ensuring index.html is in the root directory...');
if (fs.existsSync(path.join(distDir, 'templates', 'index.html'))) {
  fs.copyFileSync(
    path.join(distDir, 'templates', 'index.html'),
    path.join(distDir, 'index.html')
  );
}

// Process HTML files
console.log('Processing HTML files...');
processDirectory(distDir, '.html', (filePath, content) => {
  return htmlMinifier.minify(content, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });
});

// Process JS files
console.log('Processing JS files...');
processDirectory(distDir, '.js', (filePath, content) => {
  const result = UglifyJS.minify(content);
  if (result.error) {
    console.error(`Error minifying ${filePath}:`, result.error);
    return content;
  }
  return result.code;
});

// Add analytics script to all HTML files
console.log('Adding analytics...');
// processDirectory(distDir, '.html', (filePath, content) => {
//   const analyticsScript = `
//     <!-- Google Analytics -->
//     <script async src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"></script>
//     <script>
//       window.dataLayer = window.dataLayer || [];
//       function gtag(){dataLayer.push(arguments);}
//       gtag('js', new Date());
//       gtag('config', 'G-MEASUREMENT_ID');
//     </script>
//   `;
//   
//   return content.replace('</head>', `${analyticsScript}</head>`);
// });

// Create netlify.toml
console.log('Creating Netlify configuration...');
fs.writeFileSync(
  path.join(__dirname, 'netlify.toml'),
  `[build]
  command = "npm run build"
  publish = "dist"

# Handle routing for single-page application
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Remove the Content-Security-Policy header that might be causing issues
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    # Remove the CSP header that might be causing issues
`
);

console.log('Build completed successfully!');

// Helper function to process files in a directory
function processDirectory(directory, extension, processor) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath, extension, processor);
    } else if (path.extname(file) === extension) {
      const content = fs.readFileSync(filePath, 'utf8');
      const processedContent = processor(filePath, content);
      fs.writeFileSync(filePath, processedContent);
    }
  }
} 