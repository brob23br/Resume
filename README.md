Resume Website

A minimalist, print-friendly resume website built with vanilla HTML, CSS, and JavaScript, featuring dark/light theme toggle and AWS hosting capabilities.

Table of Contents
Features
Project Structure
Quick Start
Local Development
AWS Deployment
Usage
Contributing
License
Acknowledgements
Features
🎨 Theme Toggle: Dark and light mode with localStorage persistence
🖨️ Print-Friendly: Optimized CSS for clean PDF generation
📱 Responsive Design: Mobile-first approach with CSS Grid layout
⚡ Fast Loading: Vanilla JavaScript with no external dependencies
☁️ AWS Ready: CloudFormation template for S3 + CloudFront deployment
🔧 Modern CSS: CSS custom properties (variables) for easy theming
♿ Accessible: Semantic HTML structure with proper ARIA attributes
Project Structure
Resume/
├── Resume True.html              # Main HTML resume page
├── resume style.css              # CSS styles with theme support
├── resume script.js              # JavaScript for theme toggle and print
├── ResumeCDN-template-*.yaml     # AWS CloudFormation template
└── README.md                     # Project documentation

Quick Start
View Locally: Simply open Resume True.html in your web browser
Toggle Theme: Click the "Toggle theme" button to switch between light and dark modes
Print/Save PDF: Use the "Print / Save PDF" button for clean document output
Local Development
Prerequisites
Any modern web browser (Chrome, Firefox, Safari, Edge)
Optional: Local web server for development
Installation

Clone the repository:

git clone https://github.com/brob23br/Resume.git
cd Resume


Open directly in browser:

# On macOS
open "Resume True.html"

# On Linux
xdg-open "Resume True.html"

# On Windows
start "Resume True.html"


Or serve with a local web server (optional):

# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000


Then visit http://localhost:8000 in your browser.

File Descriptions
Resume True.html: Main HTML file containing the resume content with semantic structure
resume style.css: Stylesheet with CSS custom properties for theming, responsive grid layout, and print styles
resume script.js: Vanilla JavaScript handling theme persistence and print functionality
ResumeCDN-template-*.yaml: AWS CloudFormation template for deploying to S3 with CloudFront CDN
AWS Deployment

Deploy your resume to AWS using the included CloudFormation template for global CDN distribution.

Prerequisites
AWS CLI configured with appropriate permissions
Domain name (optional, for custom domain setup)
SSL certificate in AWS Certificate Manager (for HTTPS)
Deployment Steps

Prepare the CloudFormation template:

# Edit the template file to replace placeholder values
# Update variables like ${PRIMARY_DOMAIN}, ${SITE_BUCKET_NAME}, etc.


Deploy the stack:

aws cloudformation create-stack \
  --stack-name resume-website \
  --template-body file://ResumeCDN-template-1755952606570.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=yourdomain.com


Upload your files to S3:

# Replace 'your-bucket-name' with your actual S3 bucket name
aws s3 sync . s3://your-bucket-name/ \
  --exclude "*.yaml" \
  --exclude "*.md" \
  --exclude ".git/*"


Access your resume:

Via CloudFront distribution URL
Via your custom domain (if configured)
CloudFormation Resources

The template creates:

S3 Bucket: Static website hosting
CloudFront Distribution: Global CDN with HTTPS
Origin Access Control: Secure S3 access
Route53 Records: DNS configuration (if using custom domain)
Cache Policies: Optimized caching behavior
Usage
Theme Toggle

The website automatically saves your theme preference:

// Theme is persisted in localStorage
// Automatically loads saved preference on page refresh

Print Functionality
Click "Print / Save PDF" button for optimized printing
Print styles automatically hide interactive elements
Optimized for standard paper sizes (A4, Letter)
Customization
Update Content: Edit Resume True.html to modify resume sections
Styling: Modify CSS custom properties in resume style.css:
:root {
  --bg: #f8fafc;        /* Background color */
  --card: #ffffff;      /* Card background */
  --muted: #64748b;     /* Muted text color */
  --accent: #0369a1;    /* Accent color */
  --text: #0f172a;      /* Primary text color */
}

Dark Theme: Update .dark class variables for dark mode colors
Contributing

Contributions are welcome! Please follow these guidelines:

Getting Started
Fork the repository
Create a feature branch:
git checkout -b feature/amazing-feature

Make your changes
Test thoroughly:
Test in multiple browsers
Verify print functionality
Check responsive design
Validate HTML/CSS
Code Style
Use semantic HTML5 elements
Follow CSS BEM methodology where applicable
Keep JavaScript vanilla (no frameworks)
Maintain accessibility standards
Use consistent indentation (2 spaces)
Submitting Changes
Commit your changes:
git commit -m "Add amazing feature"

Push to your branch:
git push origin feature/amazing-feature

Open a Pull Request
Issues
Use GitHub Issues for bug reports and feature requests
Provide detailed reproduction steps for bugs
Include browser/OS information when relevant
License

This project is licensed under the MIT License - see the LICENSE file for details.

MIT License

Copyright (c) 2025 Resume Website Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Acknowledgements
Design Inspiration: Modern minimalist resume layouts
CSS Grid: For responsive layout without frameworks
AWS CloudFormation: For infrastructure as code deployment
Inter Font: Clean, professional typography
CSS Custom Properties: For maintainable theming system

Built with ❤️ using vanilla web technologies
