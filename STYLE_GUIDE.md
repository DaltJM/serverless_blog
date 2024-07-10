# TypeScript CDK Project Style Guide

## Table of Contents
1. [Code Formatting](#code-formatting)
2. [Naming Conventions](#naming-conventions)
3. [Commenting](#commenting)
4. [File Organization](#file-organization)
5. [Best Practices](#best-practices)
6. [Version Control](#version-control)
7. [Prettier Configuration](#prettier-configuration)

## Code Formatting

We use Prettier to enforce consistent code formatting. All code must adhere to the Prettier configuration specified in this project.

- **Indentation**: Use 2 spaces for indentation.
- **Line Length**: Limit lines to 80 characters.
- **Quotes**: Use single quotes (`'`) for strings.
- **Semicolons**: Always use semicolons.
- **Trailing Commas**: Use trailing commas wherever possible.
- **Bracket Spacing**: Use spaces between brackets.

## Naming Conventions

- **Variables**: Use `camelCase` for variables (`let myVariable`).
- **Functions**: Use `camelCase` for functions (`function myFunction()`).
- **Classes**: Use `PascalCase` for classes (`class MyClass`).
- **Interfaces**: Use `PascalCase` prefixed with `I` for interfaces (`interface IMyInterface`).
- **Files**: Use `kebab-case` for file names (`my-file.ts`).

## Commenting

- **Single-line comments**: Use `//` for single-line comments.
- **Multi-line comments**: Use `/* */` for multi-line comments.
- **Documentation comments**: Use TSDoc style for documenting functions, classes, and modules.

### Example:

```typescript
/**
 * This is a documentation comment.
 * @param param - Description of the parameter
 * @returns Description of the return value
 */
function exampleFunction(param: string): string {
  // This is a single-line comment
  return param;
}
```