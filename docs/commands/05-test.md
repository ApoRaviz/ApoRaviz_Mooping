# Test Commands

Run unit tests once:

```bash
npm test -- --watch=false
```

Run with Node 24 explicitly:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH npm test -- --watch=false
```

Current important test coverage:

- App renders the MooPing loyalty headline
- POS sale is staged first and must be confirmed before saving
- Undo latest sale restores the previous customer state
- Saving a reward for later moves it into saved rewards instead of losing it
