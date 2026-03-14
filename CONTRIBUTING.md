# Contributing to E-gov Document Request API

Thank you for your interest in contributing to the E-gov Document Request API project! This document outlines the guidelines and processes for contributing to this open-source project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct
This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [project-maintainer@example.com].

## Getting Started
1. Fork the repository on GitHub
2. Clone your fork locally: `git clone https://github.com/your-username/e-gov-document-request-api.git`
3. Set up the development environment (see README.md for details)
4. Create a new branch for your feature or bug fix

## Development Workflow
1. Choose an issue from the issue tracker or create a new one
2. Create a feature branch from `develop`
3. Implement your changes
4. Write tests for your changes
5. Ensure all tests pass
6. Update documentation if necessary
7. Commit your changes
8. Push your branch to your fork
9. Create a Pull Request

## Branching Strategy
We use Git Flow branching model:
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches (e.g., `feature/user-authentication`)
- `hotfix/*`: Hotfix branches for production issues
- `release/*`: Release preparation branches

## Commit Guidelines
- Use clear, descriptive commit messages
- Start with a verb in imperative mood (e.g., "Add", "Fix", "Update")
- Reference issue numbers when applicable (e.g., "Fix #123: Handle null pointer exception")
- Keep commits focused on a single change

## Pull Request Process
1. Ensure your PR is based on the latest `develop` branch
2. Provide a clear description of the changes
3. Reference any related issues
4. Ensure all CI checks pass
5. Request review from at least one maintainer
6. Address any feedback from reviewers
7. Once approved, a maintainer will merge your PR

**Note:** As the project lead, all contributions must go through the Pull Request process. Direct pushes to `main` or `develop` are not allowed.

## Code Standards
- Follow the existing code style in the project
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure code is readable and maintainable

### Backend (Node.js/Express)
- Use ESLint for code linting
- Follow RESTful API conventions
- Validate input data
- Handle errors appropriately

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Ensure accessibility (WCAG guidelines)

### Mobile (Flutter)
- Follow Flutter style guidelines
- Use Dart's effective style
- Ensure platform-specific optimizations

## Testing
- Write unit tests for new functionality
- Write integration tests for API endpoints
- Ensure all tests pass before submitting a PR
- Aim for good test coverage

## Documentation
- Update API documentation for any endpoint changes
- Update README.md if necessary
- Add code comments for complex functions
- Update this CONTRIBUTING.md if processes change

## Questions?
If you have any questions about contributing, please open an issue or contact the maintainers.

Happy contributing! 🚀