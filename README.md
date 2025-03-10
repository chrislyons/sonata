# Sonata - Custom Songs That Tell Your Story

Sonata is a website for a custom song creation service that allows users to order personalized songs for special occasions.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Maintenance](#maintenance)

## Project Overview

Sonata is a static website built with HTML, CSS, and JavaScript. It features:

- A multi-step form for ordering custom songs
- Form validation and data persistence between steps
- Responsive design for all device sizes
- Integration with Netlify for form submissions and hosting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sonata
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
sonata/
├── src/                  # Source files
│   ├── components/       # UI components
│   │   ├── account/      # Account-related components
│   │   ├── global/       # Global components (header, footer)
│   │   ├── home/         # Home page components
│   │   ├── packages/     # Package selection components
│   │   └── song-creation/# Song creation flow components
│   ├── styles/           # Global styles
│   └── templates/        # HTML templates
├── dist/                 # Built files (generated)
├── build.js              # Build script
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Development

### Adding New Pages

1. Create a new HTML file in the appropriate directory under `src/components/`
2. Link to the new page from existing pages
3. Add any necessary CSS and JavaScript files

### Modifying Existing Pages

1. Find the HTML file in the `src/components/` directory
2. Make your changes to the HTML, CSS, or JavaScript files
3. Test your changes locally using `npm start`

### Form Handling

The site uses a utility called `FormStorage` to persist form data between pages. To add a new form:

1. Include the FormStorage script in your HTML:
   ```html
   <script src="../../global/formStorage.js"></script>
   ```

2. Save form data when submitting:
   ```javascript
   FormStorage.saveFormData('formId', formData);
   ```

3. Load form data when the page loads:
   ```javascript
   FormStorage.populateForm('formId', formElement);
   ```

## Deployment

The site is configured to deploy to Netlify. To deploy:

1. Build the site:
   ```
   npm run build
   ```

2. Deploy to Netlify:
   ```
   npm run deploy
   ```

Alternatively, you can set up automatic deployments by connecting your GitHub repository to Netlify.

### Netlify Forms

The site uses Netlify Forms for form submissions. The form in `payment.html` is configured with the `data-netlify="true"` attribute. Form submissions will be available in the Netlify dashboard.

## Maintenance

### Updating Content

1. Locate the HTML file containing the content you want to update
2. Make your changes
3. Build and deploy the site

### Adding New Features

1. Develop and test the feature locally
2. Update documentation if necessary
3. Build and deploy the site

### Troubleshooting

- **Form submissions not working**: Check the Netlify dashboard to ensure forms are properly configured
- **Styles not applying**: Check for CSS conflicts or missing class names
- **JavaScript errors**: Check the browser console for error messages

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com). 