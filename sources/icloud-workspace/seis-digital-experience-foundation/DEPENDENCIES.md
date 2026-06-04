# UIX-Apps Dependency Governance

## Low-Power Dependency Audit

### Last Audit: 2026-05-25

#### Summary
- Runtime policy: no new dependency unless the feature needs it.
- Repository-intake policy: do not vendor external repo dependencies into `UIX-Apps`.
- Status: ready for a reviewed audit pass.

### Recommended Actions

1. **Read Current Tree**
   ```bash
   npm ls --depth=0
   ```

2. **Run Audit Without Mutation**
   ```bash
   npm audit --audit-level=moderate
   ```

3. **Check Outdated Packages**
   ```bash
   npm outdated
   ```

4. **Update Safe Dependencies After Review**
   ```bash
   npm update
   ```

5. **Review Major Version Updates**
   - Check compatibility before upgrading
   - Run focused checks before and after updates
   - Document breaking changes

### Security Best Practices

- [ ] Keep dependencies up-to-date
- [ ] Monitor security advisories
- [ ] Use `npm audit` regularly
- [ ] Pin versions in package-lock.json
- [ ] Review dependency changelogs before updating
- [ ] Avoid `npm audit fix --force` unless a rollback plan is explicit

### Performance Considerations

- Analyze bundle size impact
- Check for duplicate dependencies
- Use `npm ls` to identify redundancies
- Consider tree-shaking opportunities
- Avoid adding CI-only packages when an existing script already covers the check

### Next Steps

1. Schedule low-power audits.
2. Review dependency drift before adding new UI, animation, or repository-intake features.
3. Document major version upgrades.
4. Keep external repo material in `config/github-repository-intake.json` until promotion is reviewed.

---

For more information, see the project's [README.md](./README.md)
