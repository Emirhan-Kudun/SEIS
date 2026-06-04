# License & Compliance

## MIT License

```
MIT License

Copyright (c) 2026 SEIS Team

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
```

## NOTICE

This software includes components with the following licenses:

### Production Dependencies
- vue: MIT
- vue-router: MIT
- axios: MIT
- typescript: Apache-2.0

### Development Dependencies
- jest: MIT
- eslint: MIT
- prettier: MIT
- webpack: MIT

See LICENSE file for complete attribution.

## Compliance

### GDPR Compliance
- ✅ Data privacy policy implemented
- ✅ User consent management
- ✅ Data retention policies
- ✅ Right to erasure support

### CCPA Compliance
- ✅ Consumer rights support
- ✅ Disclosure practices
- ✅ Opt-out mechanisms

### HIPAA (if applicable)
- ✅ Encryption of data
- ✅ Access controls
- ✅ Audit logging

## License Check

```bash
# Check all licenses
npm list --all

# Verify compliance
npm install --save-dev license-checker
npx license-checker --onlyAllow "MIT,Apache-2.0,BSD,ISC"

# Generate license report
npx license-checker --markdown > LICENSES.md
```

## Adding License Headers

```bash
npm install --save-dev license-header-checker

# Add headers to files
license-header-checker --root src --header LICENSE_HEADER.txt
```

## License Header Template

```
/*
 * Copyright (c) 2026 SEIS Team
 * Licensed under MIT License
 * See LICENSE file for details
 */
```

## Third-Party Licenses

### Apache 2.0
Used by: TypeScript, some Google libraries

### BSD
Used by: Some utilities

### ISC
Used by: npm packages

## Contributing

Contributors agree their contributions will be licensed under the same license.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for more.

## Questions?

- License questions: legal@seis.dev
- Compliance issues: compliance@seis.dev
