# Sonata Admin Dashboard

This is the admin dashboard for the Sonata custom song creation service. It provides an interface for administrators to manage orders, customers, and songwriters.

## Project Files

- `admin-dashboard.html` - The main HTML file for the admin dashboard.
- `styles.css` - Contains all the styling for the admin dashboard.
- `script.js` - Contains the JavaScript code for interactive functionality.
- `fontawesome.css` - A custom CSS file that provides icon functionality without external dependencies.

## Features

### Dashboard Overview
- Summary statistics showing new orders, in-progress orders, and completed orders.
- Quick access to recent orders with filtering options.
- Upload functionality for completed songs.

### Order Management
- View all orders with status indicators (New, In Progress, Processing, Completed).
- Filter orders by status.
- Actions for each order (View Details, Edit Order, Contact Customer, Cancel Order).

### Responsive Design
- The dashboard is responsive and works on desktop, tablet, and mobile devices.
- Sidebar collapses to a top navigation on smaller screens.

## Setup Instructions

1. Download all project files to a folder on your local machine.
2. Open `admin-dashboard.html` in a web browser to view the dashboard.

No server setup or dependencies are required as this is a standalone frontend implementation.

## Customization

### Changing the Color Scheme

The color scheme is defined using CSS variables in the `styles.css` file. Look for the `:root` selector at the top of the file to modify the colors.

```css
:root {
    --primary-dark: #2D2E40;
    --primary-light: #565B73;
    --sidebar-start: #2D2E40;
    --sidebar-end: #3D3F58;
    --accent-color-1: #7F53AC;
    --accent-color-2: #647DEE;
    /* Additional color variables... */
}
```

### Adding New Pages

To add new pages to the admin dashboard:

1. Create a new HTML file based on the structure of `admin-dashboard.html`.
2. Update the sidebar menu links to point to your new pages.
3. Ensure you include the same CSS and JavaScript files.

## Integration Notes

This frontend implementation can be integrated with a backend system by:

1. Modifying `script.js` to make API calls to your backend services.
2. Implementing real form submissions for the upload functionality.
3. Retrieving real-time data to populate the dashboard statistics and order tables.

## Browser Compatibility

This dashboard is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the Sonata application and should be used in accordance with your Sonata license agreement.