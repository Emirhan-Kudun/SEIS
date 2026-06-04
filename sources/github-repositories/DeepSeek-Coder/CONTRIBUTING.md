# Contributing to DeepSeek-Coder

We're excited to have you contribute! This document will guide you through the process.

## Getting Started

### Prerequisites
- Python 3.9+
- Git
- CUDA 11.0+ (for GPU support, optional)

### Setup

```bash
# Clone repository
git clone https://github.com/emirhan/DeepSeek-Coder.git
cd DeepSeek-Coder

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install in development mode
pip install -e ".[dev]"
```

## Development Workflow

### Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... edit files ...

# Run tests
pytest tests/

# Run linter
flake8 src/
black src/
isort src/

# Commit
git add .
git commit -m "feat: add new feature"

# Push
git push origin feature/my-feature
```

### Running Tests

```bash
# Run all tests
pytest

# Run specific test
pytest tests/test_model.py::test_inference

# With coverage
pytest --cov=src

# Watch mode
pytest-watch

# Specific markers
pytest -m "not gpu"  # Skip GPU tests
```

## Code Style

- **Formatting**: Black
- **Linting**: Flake8
- **Sorting**: isort
- **Type hints**: Strongly recommended

### Example

```python
"""Module docstring."""

from typing import Optional


def generate_code(
    prompt: str,
    max_tokens: int = 100,
    temperature: float = 0.7,
) -> Optional[str]:
    """Generate code from prompt.
    
    Args:
        prompt: Input code snippet
        max_tokens: Maximum output length
        temperature: Sampling temperature
        
    Returns:
        Generated code or None if failed
    """
    # Implementation here
    pass
```

## Pre-commit Hooks

```bash
# Install pre-commit
pip install pre-commit

# Setup hooks
pre-commit install

# Run manually
pre-commit run --all-files
```

## Documentation

- Add docstrings to all functions
- Update README for user-facing changes
- Add examples for new models
- Document evaluation results

## Pull Request Checklist

- [ ] Code follows style guide
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] No breaking changes (or documented)
- [ ] GPU tests optional (tested locally)

## Model Evaluation

For new models or changes:

```bash
# Run evaluation suite
python -m evaluation.benchmark \
  --model my-model \
  --data-path ./data/eval \
  --output results.json
```

Update CHANGELOG with results.

## Commit Messages

```
[TYPE] Concise description

Longer explanation.

Closes #123
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Reporting Issues

### Bugs
- Clear description
- Minimal reproduction code
- Python/CUDA versions
- Error trace

### Features
- Use case description
- Expected behavior
- Implementation suggestion (optional)

## Questions?

- 💬 Discussions for questions
- 📝 Issues for bugs/features
- 🔒 security@deepseek-coder.dev for security

---

Thank you for contributing! 🚀
