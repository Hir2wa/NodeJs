// ========================================
// EXPRESS SERVER WITH EJS TEMPLATE ENGINE
// ========================================

// Import required modules
const { render } = require("ejs"); // EJS template engine for dynamic HTML
const express = require("express"); // Express.js web framework

// Create Express application instance
const app = express();

// ========================================
// SERVER CONFIGURATION
// ========================================

// Set EJS as the template engine
// This allows us to use .ejs files in the views folder
app.set("view engine", "ejs");

// Start the server and listen on port 3000
// Server will be accessible at: http://localhost:3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// ========================================
// ROUTE HANDLERS
// ========================================

// Home page route - serves the main page
app.get("/", (req, res) => {
  // Render the 'index' template from views folder
  // Express automatically looks for views/index.ejs
  res.render("index");
});

// Redirect route - redirects /about-us to /about
app.get("/about-us", (req, res) => {
  console.log("About-us route hit, redirecting to /about"); // Debug log
  // HTTP 302 redirect to /about route
  res.render("about");
});

// About page route - serves the about page
app.get("/about", (req, res) => {
  console.log("About route hit!"); // Debug log
  // Render the 'about' EJS template from views folder
  // Express automatically looks for views/about.ejs
  res.render("about");
});

// ========================================
// ERROR HANDLING
// ========================================

// 404 Error Handler - MUST be the last route
// This catches any requests that don't match the routes above
app.use((req, res) => {
  // Send 404 error page
  res.statusCode(404).render("404");
});
