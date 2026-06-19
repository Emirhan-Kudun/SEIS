# Implementation Plan

- id: implementation-plan
- version: 1
- intent: Turn a request into a small, safe, phased plan before writing code.

## Inputs
{{objective}} — what to achieve
{{constraints}} — known limits, affected paths

## Instructions
1. Restate the objective and affected paths.
2. Break work into small, ordered steps with proportional scope.
3. Note validation for each step (lightest reliable check first).
4. Call out risks, unknowns, and rollback strategy.

## Output
Sections: objective, steps, validation, risks, rollback, next step.
