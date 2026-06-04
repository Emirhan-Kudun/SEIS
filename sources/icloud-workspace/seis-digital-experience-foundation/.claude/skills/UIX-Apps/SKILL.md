```markdown
# UIX-Apps Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the UIX-Apps JavaScript repository. It covers file naming, import/export styles, commit patterns, and testing approaches. While no specific framework is used, the repository follows consistent standards for organizing and maintaining code, making it easy to contribute and maintain quality.

## Coding Conventions

### File Naming
- **Style:** kebab-case
- **Example:**
  ```
  user-profile.js
  main-header.js
  utils/helpers.js
  ```

### Import Style
- **Relative imports are used throughout.**
- **Example:**
  ```javascript
  import utils from './utils/helpers.js';
  import Header from '../components/main-header.js';
  ```

### Export Style
- **Mixed export styles are present (default and named).**
- **Examples:**
  ```javascript
  // Default export
  export default function UserProfile() { ... }

  // Named export
  export function calculateSum(a, b) { ... }
  ```

### Commit Patterns
- **Type:** Freeform (no enforced structure)
- **Prefixes:** None required
- **Average length:** ~45 characters
- **Example:**
  ```
  Fix bug in user authentication flow
  Add new theme switcher component
  ```

## Workflows

### Adding a New Component
**Trigger:** When you need to introduce a new UI component.
**Command:** `/add-component`

1. Create a new file in the appropriate directory using kebab-case (e.g., `my-new-component.js`).
2. Implement the component logic.
3. Use relative imports to include any dependencies.
4. Export the component (default or named as appropriate).
5. Write a corresponding test file (`my-new-component.test.js`).
6. Commit changes with a clear, concise message.

### Updating an Existing Module
**Trigger:** When modifying or refactoring existing code.
**Command:** `/update-module`

1. Locate the module file using kebab-case naming.
2. Make necessary code changes.
3. Update or add tests as needed.
4. Ensure imports remain relative.
5. Commit with a descriptive message.

### Writing and Running Tests
**Trigger:** When adding or updating tests.
**Command:** `/run-tests`

1. Create or update test files matching the `*.test.*` pattern (e.g., `user-profile.test.js`).
2. Write tests for new or changed functionality.
3. Use the project's preferred test runner (framework is currently unknown; check documentation or scripts).
4. Run tests and ensure all pass before committing.

## Testing Patterns

- **Test File Pattern:** `*.test.*` (e.g., `component.test.js`)
- **Framework:** Not specified; use standard JavaScript testing practices.
- **Example Test File:**
  ```javascript
  // user-profile.test.js
  import { render } from './user-profile.js';

  test('renders user profile correctly', () => {
    const result = render({ name: 'Alice' });
    expect(result).toContain('Alice');
  });
  ```

## Commands
| Command         | Purpose                                    |
|-----------------|--------------------------------------------|
| /add-component  | Scaffold and add a new UI component        |
| /update-module  | Update or refactor an existing module      |
| /run-tests      | Run all test files in the repository       |
```