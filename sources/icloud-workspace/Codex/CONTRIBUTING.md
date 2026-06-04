# Contributing to Codex

Thank you for your interest in contributing! We welcome contributions from everyone.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and respect our Code of Conduct.

**Be respectful.** We're all here to help each other.

## How to Contribute

### Reporting Bugs

**Before opening an issue:**
1. Check existing issues
2. Check documentation
3. Provide clear reproduction steps

**When reporting:**
```
**Description**: What's the problem?
**Steps to reproduce**:
1. 
2. 
3. 

**Expected behavior**: What should happen?
**Actual behavior**: What happened?
**Environment**: Node version, OS, etc.
```

### Suggesting Features

1. Check if feature already exists
2. Describe the use case
3. Explain why it's valuable
4. Provide examples if possible

### Pull Requests

**Before starting:**
1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Keep commits atomic and descriptive

**Development:**
```bash
npm install
npm run dev      # Start development
npm test         # Run tests
npm run lint     # Check code style
```

**Commit Messages:**
```
[Type] Short description

Longer explanation if needed.

Fixes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Before submitting PR:**
- [ ] Tests pass: `npm test`
- [ ] Lint passes: `npm run lint`
- [ ] Code formatted: `npm run format`
- [ ] Description of changes
- [ ] Reference related issues

## Development Setup

```bash
# Clone
git clone https://github.com/emirhan/Codex.git
cd Codex

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/my-feature

# Make changes and test
npm test

# Submit PR
```

## Style Guide

- Use 2-space indentation
- Use single quotes for strings
- Use semicolons
- Max line length: 100 characters
- Use meaningful variable names

## Commit Convention

```
feat(scope): description
fix(scope): description
docs: description
style: description
refactor(scope): description
test: description
chore: description
```

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Push to main
5. GitHub Actions deploys automatically

## Getting Help

- **Questions**: Start a Discussion
- **Ideas**: Open an Issue
- **Bugs**: Report on GitHub
- **Security**: Email security@codex.dev

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project GitHub page

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making Codex better! 🎉
