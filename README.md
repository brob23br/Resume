
# AWS DVA-C02 Lab Tracker

An interactive web application for tracking progress through hands-on AWS Certified Developer - Associate (DVA-C02) exam preparation labs.

## 🎯 Features

- **15 Comprehensive Labs** covering all DVA-C02 exam domains
- **Progress Tracking** with visual indicators and domain coverage
- **Interactive Dashboard** with filtering and search capabilities
- **Cost Awareness** with free-tier alerts and cost warnings
- **Detailed Lab Instructions** including both Console and CLI commands
- **Mobile Responsive** design for learning on any device
- **Offline Capable** - no server required, runs in browser

## 📊 Exam Domain Coverage

Based on the official DVA-C02 exam blueprint:

| Domain | Weight | Labs | Key Services |
|--------|---------|------|-------------|
| **Development with AWS Services** | 32% | 6 labs | Lambda ⭐, DynamoDB, API Gateway, S3, SQS/SNS |
| **Security** | 26% | 3 labs | Cognito, IAM, Secrets Manager, Parameter Store |
| **Deployment** | 24% | 4 labs | CloudFormation, SAM, CodePipeline, Elastic Beanstalk |
| **Troubleshooting & Optimization** | 18% | 2 labs | CloudWatch, X-Ray, Performance Analysis |

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- AWS account with appropriate permissions
- AWS CLI configured (for CLI commands)
- Basic knowledge of AWS services (Cloud Practitioner level)

### Installation

1. **Download the application:**
   ```bash
   # Clone or download this repository
   git clone <repository-url>
   cd aws-dva-lab-tracker
   ```

2. **Serve the application locally:**
   
   **Option A: Python (if installed)**
   ```bash
   python3 -m http.server 8000
   ```
   
   **Option B: Node.js (if installed)**
   ```bash
   npx serve .
   ```
   
   **Option C: PHP (if installed)**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### Alternative: File System Access
Most modern browsers support opening HTML files directly. Simply open `index.html` in your browser, though some features may be limited.

## 📚 Lab Schedule (15 Weeks)

The labs are designed for a one-lab-per-week pace:

### Weeks 1-4: Development Fundamentals
1. **Lambda Fundamentals & Event Sources** - Master serverless computing
2. **DynamoDB with Lambda Integration** - NoSQL data processing
3. **API Gateway + Lambda REST API** - Complete serverless API
4. **S3 Event Processing with Lambda** - Event-driven architecture

### Weeks 5-7: Security Implementation
5. **Cognito Authentication & Authorization** - User identity management
6. **IAM Roles & Policies for Developers** - Access control best practices
7. **Secrets Manager & Parameter Store** - Configuration management

### Weeks 8-11: Deployment & CI/CD
8. **CloudFormation & SAM Deployment** - Infrastructure as Code
9. **CI/CD with CodePipeline & Lambda** - Automated deployment
10. **Elastic Beanstalk Application Deployment** - Traditional applications
11. **CloudWatch Monitoring & Custom Metrics** - Observability

### Weeks 12-15: Advanced Topics
12. **X-Ray Distributed Tracing** - Performance debugging
13. **SQS/SNS Messaging Patterns** - Decoupled architectures
14. **ECS Container Deployment** - Container orchestration
15. **Performance Optimization & Cost Analysis** - Efficiency and costs

## 💰 Cost Management

### Free Tier Considerations
- **11 of 15 labs** are completely free tier eligible
- **4 labs** have minimal costs with proper cleanup (<$5 total)
- All labs include detailed cleanup instructions
- Cost warnings displayed prominently for each lab

### Cost Optimization Tips
1. **Always follow cleanup instructions** after completing each lab
2. **Use us-east-1 region** for lowest costs and best free tier coverage
3. **Set up billing alerts** in your AWS account
4. **Consider using AWS Budgets** to track spending
5. **Use CloudFormation/SAM** for easy resource cleanup

## 🏃‍♂️ Using the Application

### Progress Tracking
- Click the status circle (○/✓) to mark labs as completed
- View overall progress and domain-specific completion rates
- Filter labs by domain, service, or completion status

### Lab Details
- Click "View Details" to see complete lab instructions
- Follow both Console and CLI/SDK approaches
- Reference provided AWS documentation links
- Complete all objectives before marking as done

### Navigation Features
- **Grid/List View:** Switch between card and list layouts
- **Filtering:** Find specific labs by domain or service
- **Search:** Use browser search (Ctrl/Cmd+F) within lab details
- **Responsive Design:** Works on desktop, tablet, and mobile

## 🛠️ Technical Architecture

### Technology Stack
- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Data Storage:** JSON files + Browser localStorage
- **Styling:** Custom CSS with CSS Grid/Flexbox
- **Icons:** Unicode emoji for universal compatibility
- **No Dependencies:** Runs without external libraries or frameworks

### File Structure
```
aws-dva-lab-tracker/
├── index.html          # Main application interface
├── style.css           # Application styling
├── app.js              # JavaScript functionality
├── labs.json           # Lab data and instructions
├── README.md           # This documentation
└── assets/             # Additional resources (if needed)
```

### Browser Compatibility
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 📖 Lab Content Details

Each lab includes:

- **Learning Objectives:** Specific skills aligned with DVA-C02 exam
- **Theory Overview:** Key concepts and AWS service details
- **Prerequisites:** Required knowledge and setup steps
- **Console Steps:** Step-by-step AWS Console instructions
- **CLI/SDK Commands:** Command-line alternatives with examples
- **Cleanup Instructions:** Detailed resource removal steps
- **Cost Information:** Free tier eligibility and potential charges
- **Documentation Links:** Official AWS resources for deeper learning

## 🔧 Customization

### Adding New Labs
Edit `labs.json` to add new lab entries:

```json
{
  "id": "lab-016",
  "week": 16,
  "title": "Your Custom Lab",
  "domain": "development",
  "services": ["service-name"],
  "difficulty": "Beginner|Intermediate|Advanced",
  "estimatedTime": "2-3 hours",
  "description": "Lab description",
  "costWarning": "Free Tier eligible",
  "objectives": ["objective1", "objective2"],
  "theory": "Conceptual overview",
  "prerequisites": ["prerequisite1"],
  "consoleSteps": ["step1", "step2"],
  "cliCommands": [
    {
      "description": "Command description",
      "command": "aws service command"
    }
  ],
  "cleanup": ["cleanup1", "cleanup2"],
  "documentation": [
    {
      "title": "Resource Title",
      "url": "https://docs.aws.amazon.com/..."
    }
  ]
}
```

### Styling Modifications
- Modify `style.css` to change appearance
- CSS custom properties (variables) defined in `:root` for easy theming
- Responsive design uses CSS Grid and Flexbox

### Progress Data
- Progress stored in browser localStorage
- Key: `completedLabs` contains array of completed lab IDs
- Clear browser storage to reset progress

## 🎓 Study Tips

### Effective Lab Usage
1. **Read objectives first** to understand learning goals
2. **Follow both Console and CLI approaches** for complete understanding
3. **Take notes** on key concepts and commands
4. **Practice variations** of the lab scenarios
5. **Review AWS documentation** links provided

### Exam Preparation Strategy
1. Complete labs in sequence for building knowledge
2. Focus extra time on Lambda-heavy labs (Labs 1, 2, 8, 9)
3. Understand security implications in each lab
4. Practice deployment and troubleshooting scenarios
5. Review all CLI commands and their parameters

### Time Management
- **Budget 2-4 hours per lab** depending on complexity
- **Take breaks** during longer labs
- **Don't rush cleanup** - it's as important as the lab itself
- **Review previous labs** before moving to advanced topics

## 🆘 Troubleshooting

### Common Issues

**Lab won't load:**
- Ensure you're serving the files through HTTP (not file://)
- Check browser console for JavaScript errors
- Verify all files are in the same directory

**AWS CLI errors:**
- Verify AWS CLI is installed: `aws --version`
- Check credentials: `aws sts get-caller-identity`
- Ensure proper region configuration: `aws configure list`

**Console access issues:**
- Verify AWS account permissions
- Check service availability in your region
- Review IAM policies for required permissions

**Cost concerns:**
- Always follow cleanup instructions completely
- Set up billing alerts in AWS console
- Use AWS Cost Explorer to monitor spending
- Consider using AWS Budgets for cost control

### Getting Help

1. **AWS Documentation:** Each lab includes official AWS documentation links
2. **AWS Support:** Use AWS Support for account-specific issues
3. **Community Resources:** AWS Developer Forums and Stack Overflow
4. **AWS Training:** Consider AWS official training courses for additional support

## 📝 Contributing

### Feedback and Improvements
- Report issues or suggest improvements
- Share additional lab ideas aligned with DVA-C02 objectives
- Contribute cost optimization techniques
- Suggest UI/UX enhancements

### Content Guidelines
- Align all content with official DVA-C02 exam guide
- Maintain free-tier focus where possible
- Include both Console and CLI approaches
- Provide clear cleanup instructions
- Test all commands and procedures

## 📄 License

This project is created for educational purposes to support AWS DVA-C02 exam preparation. AWS service names and concepts are trademarks of Amazon Web Services.

## ⚖️ Disclaimer

- This is an unofficial study tool not affiliated with AWS
- AWS service pricing and features may change
- Always verify current AWS documentation for the most up-to-date information
- Lab costs are estimates based on typical usage patterns
- Users are responsible for managing their AWS costs and cleanup

## 🏆 Success Stories

Track your progress and celebrate milestones:
- ✅ Complete first Lambda lab
- ✅ Deploy first serverless API
- ✅ Implement security best practices
- ✅ Build complete CI/CD pipeline
- ✅ Master performance optimization
- 🎯 **Pass DVA-C02 exam!**

---

**Good luck with your AWS Developer certification journey! 🚀**

*Last updated: January 2025*
