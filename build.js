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

// Create directories for key pages
console.log('Creating directory structure for navigation...');
fs.mkdirSync(path.join(distDir, 'create'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'login'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'pricing'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'how-it-works'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'song-inspiration'), { recursive: true });

// Copy index.html to the root of dist
console.log('Copying main index.html to root...');
fs.copyFileSync(
  path.join(srcDir, 'templates', 'index.html'),
  path.join(distDir, 'index.html')
);

// Extract the header HTML from the main index.html to use as a template
console.log('Extracting header template...');
const mainIndexContent = fs.readFileSync(path.join(srcDir, 'templates', 'index.html'), 'utf8');
const headerMatch = mainIndexContent.match(/<header class="header">[\s\S]*?<\/header>/);
let headerTemplate = '';
if (headerMatch) {
  headerTemplate = headerMatch[0];
  // Make sure all links are absolute
  headerTemplate = headerTemplate.replace(/href="\//g, 'href="/');
  // Ensure the logo links to the home page
  headerTemplate = headerTemplate.replace(/<a href="[^"]*" class="header__logo">/, '<a href="/" class="header__logo">');
}

// Copy main CSS for consistent styling
console.log('Copying main CSS for consistent styling...');
// Extract CSS from main index.html
const cssMatch = mainIndexContent.match(/<style>[\s\S]*?<\/style>/);
let mainCss = '';
if (cssMatch) {
  mainCss = cssMatch[0];
}

// Copy song creation page to /create
console.log('Setting up song creation page...');
if (fs.existsSync(path.join(srcDir, 'components', 'song-creation', 'song-details', 'song-details.html'))) {
  // Read the file content
  let songDetailsContent = fs.readFileSync(
    path.join(srcDir, 'components', 'song-creation', 'song-details', 'song-details.html'),
    'utf8'
  );
  
  // Replace the header with the consistent header template
  if (headerTemplate) {
    songDetailsContent = songDetailsContent.replace(/<header[\s\S]*?<\/header>/, headerTemplate);
  }
  
  // Fix relative paths in the HTML
  songDetailsContent = songDetailsContent.replace(/\.\.\/\.\.\//g, '/');
  songDetailsContent = songDetailsContent.replace(/href="\.\.\/how-it-works\/index\.html"/g, 'href="/how-it-works/"');
  songDetailsContent = songDetailsContent.replace(/href="\.\.\/song-inspiration\/index\.html"/g, 'href="/song-inspiration/"');
  songDetailsContent = songDetailsContent.replace(/href="\.\.\/packages\/index\.html"/g, 'href="/pricing/"');
  songDetailsContent = songDetailsContent.replace(/href="\.\.\/account\/my-songs\.html"/g, 'href="/account/my-songs/"');
  songDetailsContent = songDetailsContent.replace(/href="\.\.\/account\/login-signup\/index\.html"/g, 'href="/login/"');
  
  // Add the main CSS to ensure consistent styling
  if (mainCss) {
    songDetailsContent = songDetailsContent.replace('</head>', `${mainCss}</head>`);
  }
  
  // Write the modified content
  fs.writeFileSync(
    path.join(distDir, 'create', 'index.html'),
    songDetailsContent
  );
  
  // Copy associated CSS and JS files
  if (fs.existsSync(path.join(srcDir, 'components', 'song-creation', 'song-details', 'styles.css'))) {
    fs.copyFileSync(
      path.join(srcDir, 'components', 'song-creation', 'song-details', 'styles.css'),
      path.join(distDir, 'create', 'styles.css')
    );
  }
  
  if (fs.existsSync(path.join(srcDir, 'components', 'song-creation', 'song-details', 'script.js'))) {
    fs.copyFileSync(
      path.join(srcDir, 'components', 'song-creation', 'song-details', 'script.js'),
      path.join(distDir, 'create', 'script.js')
    );
  }
  
  // Copy header.css for the song creation page
  if (fs.existsSync(path.join(srcDir, 'components', 'song-creation', 'header.css'))) {
    fs.copyFileSync(
      path.join(srcDir, 'components', 'song-creation', 'header.css'),
      path.join(distDir, 'create', 'header.css')
    );
  }
}

// Copy login page to /login
console.log('Setting up login page...');
if (fs.existsSync(path.join(srcDir, 'components', 'account', 'login-signup', 'index.html'))) {
  // Read the file content
  let loginContent = fs.readFileSync(
    path.join(srcDir, 'components', 'account', 'login-signup', 'index.html'),
    'utf8'
  );
  
  // Fix the logo link to point to the home page
  loginContent = loginContent.replace(/<a href="[^"]*" class="logo">Sonata<\/a>/, '<a href="/" class="logo">Sonata</a>');
  
  // Fix relative paths in the HTML
  loginContent = loginContent.replace(/\.\.\/\.\.\//g, '/');
  
  // Write the modified content
  fs.writeFileSync(
    path.join(distDir, 'login', 'index.html'),
    loginContent
  );
  
  // Copy associated CSS and JS files
  if (fs.existsSync(path.join(srcDir, 'components', 'account', 'login-signup', 'styles.css'))) {
    fs.copyFileSync(
      path.join(srcDir, 'components', 'account', 'login-signup', 'styles.css'),
      path.join(distDir, 'login', 'styles.css')
    );
  }
  
  if (fs.existsSync(path.join(srcDir, 'components', 'account', 'login-signup', 'script.js'))) {
    fs.copyFileSync(
      path.join(srcDir, 'components', 'account', 'login-signup', 'script.js'),
      path.join(distDir, 'login', 'script.js')
    );
  }
}

// Copy pricing page to /pricing
console.log('Setting up pricing page...');
if (fs.existsSync(path.join(srcDir, 'components', 'packages', 'index.html'))) {
  // Read the file content
  let pricingContent = fs.readFileSync(
    path.join(srcDir, 'components', 'packages', 'index.html'),
    'utf8'
  );
  
  // Replace the header with the consistent header template if available
  if (headerTemplate) {
    const pricingHeaderMatch = pricingContent.match(/<header[\s\S]*?<\/header>/);
    if (pricingHeaderMatch) {
      pricingContent = pricingContent.replace(pricingHeaderMatch[0], headerTemplate);
    }
  }
  
  // Fix relative paths in the HTML
  pricingContent = pricingContent.replace(/\.\.\/\.\.\//g, '/');
  pricingContent = pricingContent.replace(/href="\/how-it-works"/g, 'href="/how-it-works/"');
  pricingContent = pricingContent.replace(/href="\/song-inspiration"/g, 'href="/song-inspiration/"');
  pricingContent = pricingContent.replace(/href="\/pricing"/g, 'href="/pricing/"');
  pricingContent = pricingContent.replace(/href="\/login"/g, 'href="/login/"');
  
  // Add the main CSS to ensure consistent styling
  if (mainCss) {
    pricingContent = pricingContent.replace('</head>', `${mainCss}</head>`);
  }
  
  // Write the modified content
  fs.writeFileSync(
    path.join(distDir, 'pricing', 'index.html'),
    pricingContent
  );
  
  // Copy associated CSS files
  if (fs.existsSync(path.join(srcDir, 'components', 'packages', 'packages.css'))) {
    fs.copyFileSync(
      path.join(srcDir, 'components', 'packages', 'packages.css'),
      path.join(distDir, 'pricing', 'packages.css')
    );
  }
  
  // Copy other package-related files
  const packageFiles = ['hero.html', 'hero.css', 'comparison.html', 'comparison.css', 'faq.html', 'faq.css', 'faq.js'];
  packageFiles.forEach(file => {
    if (fs.existsSync(path.join(srcDir, 'components', 'packages', file))) {
      fs.copyFileSync(
        path.join(srcDir, 'components', 'packages', file),
        path.join(distDir, 'pricing', file)
      );
    }
  });
}

// Create placeholder pages for how-it-works and song-inspiration
console.log('Creating placeholder pages for how-it-works and song-inspiration...');
const placeholderPages = ['how-it-works', 'song-inspiration'];
placeholderPages.forEach(page => {
  const placeholderContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sonata - ${page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</title>
  <link rel="stylesheet" href="/styles/reset.css">
  <link rel="stylesheet" href="/styles/variables.css">
  <link rel="stylesheet" href="/styles/global.css">
  ${mainCss || ''}
</head>
<body>
  ${headerTemplate || ''}
  <div class="container" style="padding: 100px 20px; text-align: center;">
    <h1 style="font-size: 32px; margin-bottom: 20px;">Coming Soon</h1>
    <p style="font-size: 18px; margin-bottom: 30px;">We're working on this page. Please check back later.</p>
    <a href="/" class="button button--primary">Return to Home</a>
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(
    path.join(distDir, page, 'index.html'),
    placeholderContent
  );
});

// Copy global styles and scripts to ensure they're available
console.log('Copying global styles and scripts...');
fs.mkdirSync(path.join(distDir, 'styles'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'scripts'), { recursive: true });

// Copy global styles
['global.css', 'reset.css', 'variables.css'].forEach(file => {
  if (fs.existsSync(path.join(srcDir, 'styles', file))) {
    fs.copyFileSync(
      path.join(srcDir, 'styles', file),
      path.join(distDir, 'styles', file)
    );
  }
});

// Copy formStorage.js to scripts directory
if (fs.existsSync(path.join(srcDir, 'components', 'global', 'formStorage.js'))) {
  fs.copyFileSync(
    path.join(srcDir, 'components', 'global', 'formStorage.js'),
    path.join(distDir, 'scripts', 'formStorage.js')
  );
}

// Fix all HTML files to ensure logo links to home and navigation is consistent
console.log('Fixing navigation in all HTML files...');
processDirectory(distDir, '.html', (filePath, content) => {
  // Fix logo links to always point to home
  content = content.replace(/<a href="[^"]*"(\s+class="(?:logo|header__logo)")>Sonata<\/a>/g, '<a href="/"$1>Sonata</a>');
  content = content.replace(/<a href="[^"]*"(\s+class="(?:logo|header__logo)")>\s*<h1>Sonata<\/h1>\s*<\/a>/g, '<a href="/"$1><h1>Sonata</h1></a>');
  
  // Fix navigation links
  content = content.replace(/href="\.\.\/how-it-works\/index\.html"/g, 'href="/how-it-works/"');
  content = content.replace(/href="\.\.\/song-inspiration\/index\.html"/g, 'href="/song-inspiration/"');
  content = content.replace(/href="\.\.\/packages\/index\.html"/g, 'href="/pricing/"');
  content = content.replace(/href="\.\.\/account\/login-signup\/index\.html"/g, 'href="/login/"');
  
  // Fix relative paths to CSS and JS
  content = content.replace(/href="\.\.\/\.\.\/styles\//g, 'href="/styles/');
  content = content.replace(/src="\.\.\/\.\.\/scripts\//g, 'src="/scripts/');
  
  return content;
});

// Process HTML files for minification
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

// Create netlify.toml
console.log('Creating Netlify configuration...');
fs.writeFileSync(
  path.join(__dirname, 'netlify.toml'),
  `[build]
  command = "npm run build"
  publish = "dist"

# Handle specific routes
[[redirects]]
  from = "/create/*"
  to = "/create/index.html"
  status = 200

[[redirects]]
  from = "/login/*"
  to = "/login/index.html"
  status = 200

[[redirects]]
  from = "/pricing/*"
  to = "/pricing/index.html"
  status = 200

[[redirects]]
  from = "/how-it-works/*"
  to = "/how-it-works/index.html"
  status = 200

[[redirects]]
  from = "/song-inspiration/*"
  to = "/song-inspiration/index.html"
  status = 200

# Fallback for other routes
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers for security and caching
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
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