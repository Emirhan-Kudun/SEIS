# CHANGELOG.md - Version History

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New feature placeholder

### Changed
- Change placeholder

### Fixed
- Bug fix placeholder

### Deprecated
- Deprecation placeholder

### Removed
- Removal placeholder

### Security
- Security fix placeholder

## [1.0.0] - 2026-05-25

### Added
- Initial release
- Core functionality
- Basic CLI interface
- Documentation

### Changed
- N/A

### Fixed
- N/A

### Security
- Initial security audit passed

---

## Guide for Changelog

### When to Update
- ✅ Before each release
- ✅ After merging features
- ✅ After bug fixes
- ✅ Before tagging release

### Format
```markdown
## [Version] - YYYY-MM-DD

### Added
- New features

### Changed  
- Modified behavior

### Fixed
- Bug fixes

### Deprecated
- Deprecated features

### Removed
- Removed features

### Security
- Security fixes
```

### Script to Auto-Generate

```bash
# Install conventional-changelog
npm install --save-dev conventional-changelog-cli

# Generate from commits
conventional-changelog -p angular -i CHANGELOG.md -s

# Create initial
conventional-changelog -p angular > CHANGELOG.md
```

## CI/CD Integration

Add to GitHub Actions:
```yaml
- name: Update CHANGELOG
  run: npm run changelog
```

Add to package.json:
```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for commit conventions.
