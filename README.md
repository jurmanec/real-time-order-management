# Real-Time Order Management Dashboard

## Overview
This is a cloud-native, full-stack application for real-time order management, integrating inventory, customer, and logistics data. It uses AWS serverless architecture (Lambda, API Gateway, DynamoDB, Kinesis) and a React frontend. The project showcases modern development practices, including CI/CD, observability, and an optional AI/ML feature (demand forecasting with SageMaker). It draws inspiration from real-world order fulfillment systems, similar to those developed at Comcast (e.g., Next-Gen Fulfillment API).

**Status**: In planning phase (July 2025). Currently setting up the GitHub repository, defining architecture, and initializing AWS resources. Target completion: September 2025.

## Features
- Real-time order tracking with WebSocket updates via API Gateway (e.g., order status: Pending, Shipped).
- Inventory visualization with stock levels and low-stock alerts using Chart.js.
- Notification system for order status changes using AWS SNS/SQS.
- Optional ML component: Demand forecasting with AWS SageMaker to predict order volume.
- Secure APIs with AWS Cognito authentication.
- DevOps practices: CI/CD with GitHub Actions, Infrastructure as Code with CloudFormation, and observability with Grafana.

## Tech Stack
- Frontend: React.js (JavaScript), Chart.js
- Backend: AWS Lambda (Python/Node.js), API Gateway, Step Functions, DynamoDB, SQS, SNS, Kinesis
- Optional ML: AWS SageMaker (Python)
- DevOps: GitHub Actions, CloudFormation, Docker, SonarQube, Grafana
- Testing: Pytest (Python), Junit (if Java is used), Cypress (end-to-end)

## Project Structure
- /frontend: React frontend code
- /backend: AWS Lambda functions (Python/Node.js)
- /iac: CloudFormation templates for AWS resources
- /docs: Architecture diagrams, ML notebook, demo video
- /.github/workflows: GitHub Actions CI/CD pipelines
- README.md: Project overview
- .gitignore: Ignores node_modules, .env, etc.

## Setup Instructions
Note: These are preliminary instructions and will be updated as development progresses.

### Prerequisites
- Node.js version 18 or higher (for frontend and Node.js Lambda functions)
- Python version 3.9 or higher (for Python Lambda functions and SageMaker)
- AWS CLI version 2 (configured with IAM credentials)
- Git
- Docker (optional, for local testing)

### Installation
1. Clone the repository:
   git clone https://github.com/jacoburmanec/real-time-order-management.git
   cd real-time-order-management

2. Frontend setup:
   cd frontend
   npm install
   npm start

3. Backend setup:
- Install Serverless Framework:
  ```
  npm install -g serverless
  ```
- Configure AWS credentials in ~/.aws/credentials
- Deploy Lambda functions (once developed):
  ```
  cd backend
  serverless deploy
  ```

4. Infrastructure setup:
- Deploy AWS resources (once CloudFormation templates are added):
  ```
  cd iac
  aws cloudformation deploy --stack-name order-management --template-file stack.yml
  ```

## Development Plan
- Weeks 1-2: Set up monorepo, AWS resources (DynamoDB, Lambda), and CI/CD with GitHub Actions.
- Weeks 3-4: Build core backend APIs, Kinesis streaming, and notifications.
- Weeks 5-6: Develop React frontend and integrate with backend.
- Weeks 7-8: Add observability (Grafana), testing (Cypress, Pytest), and optional SageMaker ML model.
- Deliverables: Source code, CI/CD pipelines, architecture diagrams, demo video, optional ML notebook.

## Future Sections
- Architecture Diagram: Visual overview of AWS and frontend components.
- Demo: Video showcasing the dashboard and real-time features.
- API Documentation: Swagger/OpenAPI specs for endpoints.
- ML Model Details: Jupyter notebook for SageMaker demand forecasting.

## Contributing
This is a personal portfolio project, but feedback is welcome. Open an issue or email me at jurmanec@gmail.com.

## License
MIT License (see LICENSE file)

## Author
Jacob Urmanec
- LinkedIn: https://linkedin.com/in/jacoburmanec
- GitHub: https://github.com/jacoburmanec
