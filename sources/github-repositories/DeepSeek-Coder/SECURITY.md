# Security Policy - DeepSeek-Coder

## Responsible Disclosure

Found a vulnerability? Please email **security@deepseek-coder.dev** instead of opening a public issue.

Include:
- Vulnerability type
- Affected components
- Reproduction steps
- Potential impact

## Security Standards

### Model & Data Security
- ✅ No training data leakage
- ✅ Model inference safety
- ✅ Input sanitization for code generation
- ✅ Secure API authentication
- ✅ Rate limiting on API

### Infrastructure
- ✅ Regular dependency updates
- ✅ Security scanning (Bandit for Python)
- ✅ Container scanning
- ✅ Encryption in transit (HTTPS/TLS)
- ✅ Secure credential management

### Code Generation Safety
- ✅ Filter harmful code patterns
- ✅ Input validation
- ✅ Output sanitization
- ✅ Blacklist dangerous operations
- ✅ Safety testing in CI/CD

## Python Security Checks

```bash
# Run security audit
bandit -r . -f json -o bandit-report.json

# Check dependencies
pip-audit

# Code analysis
pylint src/
```

## Compliance

- OWASP guidelines adherence
- Regular security audits
- Penetration testing
- Data protection compliance

## Support

- Security: security@deepseek-coder.dev
- Issues: GitHub Issues
- Discussions: GitHub Discussions
