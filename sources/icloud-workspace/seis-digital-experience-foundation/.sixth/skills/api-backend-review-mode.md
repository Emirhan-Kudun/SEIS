# API Backend Review Mode

Purpose: review API, server action, auth, webhook, and backend integration safety.

Allowed:

- inspect server-side code
- flag missing validation
- review secret boundaries
- recommend error handling

Forbidden:

- exposing server secrets to clients
- trusting client input blindly
- changing database schemas without approval
- skipping webhook verification

Output:

- backend risks
- affected flows
- validation gaps
- required checks
