# Health-checks

### Public

`GET http://localhost/`

Response example:

```json
{
  "healthChecks": {
    "heartbeat": "HEALTHY",
    "serviceApi": "HEALTHY"
  },
  "stats": {
    "creationTime": "2023-06-19T07:43:54.049Z",
    "uptime": 305489.91029646,
    "memory": {
      "rss": 111931392,
      "heapTotal": 50212864,
      "heapUsed": 39488592,
      "external": 1467291,
      "arrayBuffers": 208148
    }
  },
  "info": {
    "env": "production",
    "gitCommitSha": "cc7651f",
    "version": "1"
  }
}
```

### Internal

`GET http://localhost/health`

Response example:

```json
{
  "version": "1",
  "gitCommitSha": "cc7651f",
  "checks": {
    "dummy": "HEALTHY",
    "serviceApi": "FAIL"
  },
  "heartbeat": "HEALTHY"
}
```
