
class LabTracker {
    constructor() {
        this.labs = [];
        this.completedLabs = this.getCompletedLabs();
        this.currentView = 'grid';
        this.filters = {
            domain: '',
            service: '',
            status: ''
        };
        // Mapping from service/domain to a relevant AWS whitepaper
        this.whitepaperMap = {
            lambda: { title: 'AWS Lambda Best Practices', url: 'https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html' },
            dynamodb: { title: 'Amazon DynamoDB Best Practices', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html' },
            'api-gateway': { title: 'Amazon API Gateway Developer Guide', url: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/' },
            s3: { title: 'Amazon S3 Best Practices', url: 'https://aws.amazon.com/whitepapers/' },
            iam: { title: 'AWS Security Best Practices', url: 'https://d1.awsstatic.com/whitepapers/Security/AWS_Security_Best_Practices.pdf' },
            cloudwatch: { title: 'Monitoring and Observability', url: 'https://aws.amazon.com/whitepapers/' },
            development: { title: 'AWS Developer Best Practices', url: 'https://aws.amazon.com/whitepapers/' },
            security: { title: 'AWS Security Best Practices', url: 'https://d1.awsstatic.com/whitepapers/Security/AWS_Security_Best_Practices.pdf' },
            deployment: { title: 'Architecting for the Cloud: Best Practices', url: 'https://d1.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf' },
            troubleshooting: { title: 'AWS Operational Best Practices', url: 'https://aws.amazon.com/whitepapers/' },
            default: { title: 'AWS Whitepapers', url: 'https://aws.amazon.com/whitepapers/' }
        };
        
        this.init();
    }

    // Return the most relevant whitepaper for a lab (checks services first, then domain)
    getWhitepaperForLab(lab) {
        if (!lab) return this.whitepaperMap.default;

        // If a lab explicitly specifies a whitepaper, prefer it
        if (lab.whitepaper && lab.whitepaper.url) return lab.whitepaper;

        // prefer service-specific whitepapers
        for (const svc of lab.services || []) {
            if (this.whitepaperMap[svc]) return this.whitepaperMap[svc];
        }

        // then domain-level
        if (lab.domain && this.whitepaperMap[lab.domain]) return this.whitepaperMap[lab.domain];

        return this.whitepaperMap.default;
    }

    // Return the best documentation link for a lab: prefer lab.documentation[0], then lab.whitepaper, then mapped whitepapers
    getDocsForLab(lab) {
        if (!lab) return this.whitepaperMap.default;

        if (lab.documentation && lab.documentation.length > 0 && lab.documentation[0].url) {
            return { title: lab.documentation[0].title || 'AWS Docs', url: lab.documentation[0].url };
        }

        if (lab.whitepaper && lab.whitepaper.url) return lab.whitepaper;

        return this.getWhitepaperForLab(lab);
    }

    async init() {
        await this.loadLabs();
        this.setupEventListeners();
        this.renderLabs();
        this.updateProgress();
        this.updateDomainProgress();
    }

    async loadLabs() {
        try {
            const response = await fetch('labs.json');
            this.labs = await response.json();
            // Ensure every lab has a whitepaper entry at runtime so AWS Docs button works for all labs
            this.labs = this.labs.map(lab => {
                try {
                    if (!lab.whitepaper || !lab.whitepaper.url) {
                        lab.whitepaper = this.getWhitepaperForLab(lab);
                    }
                } catch (e) {
                    // defensive: fallback to default whitepaper
                    lab.whitepaper = this.whitepaperMap.default;
                }
                return lab;
            });
        } catch (error) {
            console.error('Failed to load labs:', error);
            this.labs = [];
            this.showError('Failed to load lab data. Please refresh the page.');
        }
    }

    setupEventListeners() {
        // View toggle
        document.getElementById('gridView').addEventListener('click', () => this.setView('grid'));
        document.getElementById('listView').addEventListener('click', () => this.setView('list'));

        // Filters
        document.getElementById('domainFilter').addEventListener('change', (e) => {
            this.filters.domain = e.target.value;
            this.renderLabs();
        });
        
        document.getElementById('serviceFilter').addEventListener('change', (e) => {
            this.filters.service = e.target.value;
            this.renderLabs();
        });
        
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderLabs();
        });

        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        // Modal
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('labModal').style.display = 'none';
        });

        // Close modal on outside click
        document.getElementById('labModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('labModal')) {
                document.getElementById('labModal').style.display = 'none';
            }
        });

        // Cost alert close
        document.getElementById('closeCostAlert').addEventListener('click', () => {
            document.getElementById('costAlert').style.display = 'none';
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('labModal').style.display = 'none';
                document.getElementById('costAlert').style.display = 'none';
            }
        });
    }

    setView(view) {
        this.currentView = view;
        
        // Update button states
        document.getElementById('gridView').classList.toggle('active', view === 'grid');
        document.getElementById('listView').classList.toggle('active', view === 'list');
        
        // Update container class
        const container = document.getElementById('labsContainer');
        container.className = view === 'grid' ? 'labs-grid' : 'labs-list';
    }

    resetFilters() {
        this.filters = { domain: '', service: '', status: '' };
        document.getElementById('domainFilter').value = '';
        document.getElementById('serviceFilter').value = '';
        document.getElementById('statusFilter').value = '';
        this.renderLabs();
    }

    getCompletedLabs() {
        return JSON.parse(localStorage.getItem('completedLabs') || '[]');
    }

    saveCompletedLabs() {
        localStorage.setItem('completedLabs', JSON.stringify(this.completedLabs));
    }

    toggleLabCompletion(labId) {
        const lab = this.labs.find(l => l.id === labId);
        if (!lab) return;

        if (this.completedLabs.includes(labId)) {
            this.completedLabs = this.completedLabs.filter(id => id !== labId);
        } else {
            this.completedLabs.push(labId);
            
            // Show cost alert if lab has cost warnings
            if (lab.costWarning && lab.costWarning !== 'Free Tier eligible') {
                this.showCostAlert(lab.costWarning);
            }
        }
        
        this.saveCompletedLabs();
        this.renderLabs();
        this.updateProgress();
        this.updateDomainProgress();
    }

    showCostAlert(message) {
        const alert = document.getElementById('costAlert');
        const messageElement = document.getElementById('costAlertMessage');
        messageElement.textContent = message;
        alert.style.display = 'flex';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000);
    }

    showError(message) {
        const container = document.getElementById('labsContainer');
        container.innerHTML = `<div class="error-message" style="text-align: center; padding: 2rem; color: var(--danger-color);">${message}</div>`;
    }

    filterLabs() {
        return this.labs.filter(lab => {
            const domainMatch = !this.filters.domain || lab.domain === this.filters.domain;
            const serviceMatch = !this.filters.service || lab.services.includes(this.filters.service);
            const statusMatch = !this.filters.status || 
                (this.filters.status === 'completed' && this.completedLabs.includes(lab.id)) ||
                (this.filters.status === 'not-started' && !this.completedLabs.includes(lab.id));
            
            return domainMatch && serviceMatch && statusMatch;
        });
    }

    renderLabs() {
        const container = document.getElementById('labsContainer');
        const filteredLabs = this.filterLabs();

        if (filteredLabs.length === 0) {
            container.innerHTML = '<div class="no-results" style="text-align: center; padding: 2rem; color: var(--dark-gray);">No labs match your current filters.</div>';
            return;
        }

        const labCards = filteredLabs.map(lab => this.createLabCard(lab)).join('');
        container.innerHTML = labCards;

        // Add event listeners for lab interactions
        filteredLabs.forEach(lab => {
            const statusButton = document.getElementById(`status-${lab.id}`);
            const detailsButton = document.getElementById(`details-${lab.id}`);
            const awsDocsButton = document.getElementById(`awsdocs-${lab.id}`);

            if (statusButton) {
                statusButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleLabCompletion(lab.id);
                });
            }

            if (detailsButton) {
                detailsButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showLabDetails(lab);
                });
            }

            // Open preferred docs link (documentation[0] preferred) when AWS Docs button is clicked
            if (awsDocsButton) {
                const doc = this.getDocsForLab(lab);
                if (doc && doc.url) {
                    awsDocsButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        window.open(doc.url, '_blank', 'noopener');
                    });
                }
            }
        });
    }

    createLabCard(lab) {
        const isCompleted = this.completedLabs.includes(lab.id);
        const isLambdaFocus = lab.services.includes('lambda');
        // Determine most relevant docs link for this lab (prefer documentation[0])
        const docs = this.getDocsForLab(lab);
        const awsDocsBtn = docs && docs.url
            ? `<button class="btn btn-secondary" id="awsdocs-${lab.id}" type="button" title="${docs.title}">📚 AWS Docs</button>`
            : `<button class="btn btn-secondary" type="button" disabled title="No AWS Docs available">📚 AWS Docs</button>`;

        return `
            <div class="lab-card ${isCompleted ? 'completed' : ''} ${isLambdaFocus ? 'lambda-focus' : ''} domain-${lab.domain}" 
                 data-lab-id="${lab.id}">
                <div class="lab-header">
                    <div>
                        <h3 class="lab-title">${lab.title}</h3>
                        <span class="lab-domain ${lab.domain}">${this.getDomainLabel(lab.domain)}</span>
                    </div>
                    <div class="lab-status ${isCompleted ? 'completed' : ''}" 
                         id="status-${lab.id}"
                         title="${isCompleted ? 'Mark as not completed' : 'Mark as completed'}"
                         role="button"
                         tabindex="0"
                         aria-label="${isCompleted ? 'Mark lab as not completed' : 'Mark lab as completed'}">
                        ${isCompleted ? '✓' : '○'}
                    </div>
                </div>
                
                <div class="lab-meta">
                    <div class="meta-item">
                        <span>⏱️</span>
                        <span>${lab.estimatedTime}</span>
                    </div>
                    <div class="meta-item">
                        <span>📊</span>
                        <span>${lab.difficulty}</span>
                    </div>
                    <div class="meta-item">
                        <span>📋</span>
                        <span>Week ${lab.week}</span>
                    </div>
                </div>
                
                <div class="lab-services">
                    ${lab.services.map(service => 
                        `<span class="service-tag ${service === 'lambda' ? 'lambda-tag' : ''}">${this.getServiceLabel(service)}</span>`
                    ).join('')}
                </div>
                
                <p class="lab-description">${lab.description}</p>
                
                <div class="cost-warning ${lab.costWarning === 'Free Tier eligible' ? 'cost-free' : ''}">
                    <span>${lab.costWarning === 'Free Tier eligible' ? '✅' : '⚠️'}</span>
                    <span>${lab.costWarning}</span>
                </div>
                
                <div class="lab-actions">
                    <button class="btn btn-primary" id="details-${lab.id}">
                        📖 View Details
                    </button>
                    ${awsDocsBtn}
                </div>
            </div>
        `;
    }

    getDomainLabel(domain) {
        const labels = {
            'development': 'Development (32%)',
            'security': 'Security (26%)',
            'deployment': 'Deployment (24%)',
            'troubleshooting': 'Troubleshooting (18%)'
        };
        return labels[domain] || domain;
    }

    getServiceLabel(service) {
        const labels = {
            'lambda': 'Lambda ⭐',
            'dynamodb': 'DynamoDB',
            'api-gateway': 'API Gateway',
            's3': 'S3',
            'cognito': 'Cognito',
            'iam': 'IAM',
            'cloudformation': 'CloudFormation',
            'sam': 'SAM',
            'cloudwatch': 'CloudWatch',
            'x-ray': 'X-Ray',
            'sqs': 'SQS',
            'sns': 'SNS',
            'codepipeline': 'CodePipeline',
            'codebuild': 'CodeBuild',
            'codedeploy': 'CodeDeploy',
            'elastic-beanstalk': 'Elastic Beanstalk',
            'ecs': 'ECS',
            'ecr': 'ECR',
            'secrets-manager': 'Secrets Manager',
            'parameter-store': 'Parameter Store',
            'kms': 'KMS'
        };
        return labels[service] || service;
    }

    showLabDetails(lab) {
        const modal = document.getElementById('labModal');
        const modalContent = document.getElementById('modalContent');
        
        modalContent.innerHTML = this.createLabDetailsContent(lab);
        modal.style.display = 'block';
        
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'false');
        document.getElementById('closeModal').focus();
    }

    createLabDetailsContent(lab) {
        const isCompleted = this.completedLabs.includes(lab.id);
        
        return `
            <div class="modal-header">
                <h2 class="modal-title">${lab.title}</h2>
                <div class="modal-meta">
                    <span class="lab-domain">${this.getDomainLabel(lab.domain)}</span>
                    <span>⏱️ ${lab.estimatedTime}</span>
                    <span>📊 ${lab.difficulty}</span>
                    <span>📋 Week ${lab.week}</span>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="lab-section">
                    <div class="cost-warning ${lab.costWarning === 'Free Tier eligible' ? 'cost-free' : ''}">
                        <span>${lab.costWarning === 'Free Tier eligible' ? '✅' : '⚠️'}</span>
                        <span><strong>Cost Information:</strong> ${lab.costWarning}</span>
                    </div>
                </div>

                <div class="lab-section">
                    <h3>📋 Learning Objectives</h3>
                    <ul class="objectives-list">
                        ${lab.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>

                <div class="lab-section">
                    <h3>📚 Theory Overview</h3>
                    <p>${lab.theory}</p>
                </div>

                <div class="lab-section">
                    <h3>🔧 Prerequisites</h3>
                    <ul class="objectives-list">
                        ${lab.prerequisites.map(prereq => `<li>${prereq}</li>`).join('')}
                    </ul>
                </div>

                <div class="lab-section">
                    <h3>🖥️ AWS Console Steps</h3>
                    <ol class="steps-list">
                        ${lab.consoleSteps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>

                <div class="lab-section">
                    <h3>⌨️ CLI/SDK Commands</h3>
                    ${lab.cliCommands.map(cmd => `
                        <div class="command-section">
                            <h4>${cmd.description}</h4>
                            <div class="code-block">${cmd.command}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="lab-section">
                    <h3>🧹 Cleanup Instructions</h3>
                    <ol class="steps-list">
                        ${lab.cleanup.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>

                <div class="lab-section">
                    <h3>📖 Additional Resources</h3>
                    <div class="docs-links">
                        ${lab.documentation.map(doc => `
                            <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="docs-link">
                                ${doc.title}
                            </a>
                        `).join('')}
                    </div>
                </div>

                <div class="lab-section">
                    <div style="text-align: center; padding: 1rem;">
                        <button class="btn btn-primary" onclick="labTracker.toggleLabCompletion('${lab.id}'); document.getElementById('labModal').style.display='none';">
                            ${isCompleted ? '↩️ Mark as Not Completed' : '✅ Mark as Completed'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    updateProgress() {
        const completed = this.completedLabs.length;
        const total = this.labs.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('completedLabs').textContent = completed;
        document.getElementById('totalLabs').textContent = total;
        document.getElementById('progressPercent').textContent = `${percentage}%`;
        document.getElementById('progressBarFill').style.width = `${percentage}%`;
    }

    updateDomainProgress() {
        const domains = ['development', 'security', 'deployment', 'troubleshooting'];
        
        domains.forEach(domain => {
            const domainLabs = this.labs.filter(lab => lab.domain === domain);
            const completedDomainLabs = domainLabs.filter(lab => this.completedLabs.includes(lab.id));
            
            const completed = completedDomainLabs.length;
            const total = domainLabs.length;
            const percentage = total > 0 ? (completed / total) * 100 : 0;

            const progressElement = document.getElementById(`${domain}Progress`);
            const countElement = document.getElementById(`${domain}Count`);

            if (progressElement) {
                progressElement.style.width = `${percentage}%`;
            }
            if (countElement) {
                countElement.textContent = `${completed}/${total}`;
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.labTracker = new LabTracker();
});

// Export for potential use in other contexts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LabTracker;
}
