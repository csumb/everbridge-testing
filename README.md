# Everbridge emergency service

When a person visits the campus website, and there is an active emergency, they should be notified immediately. This service exposes active emergencies as a simple JSON CORS API.

## Authentication

Updating messages requires sending a unique key to the `update` endpoint. Before running this service, make sure to set the environment variable `EMERGENCY_UPDATE_TOKEN` with a random string.

## Setting up Everbridge

This service needs to be set up as a "Web Publishing" endpoint under the Settings area of an organization in Everbridge. Add a new web publisher with the URL:

```
https://[my domain]/update?key=[value of EMERGENCY_UPDATE_TOKEN]
```

## Sending all clear

To stop sending emergency messages, send an Everbridge message with "all clear" in the title.

## Response

The response includes a boolean `status` value, where `true` means an emergency is active.

When there is _no_ emergency:

```json
{
  "status": false
}
```

When there **is** an emergency:

```json
{
  "status": true,
  "title": "Viking attack!",
  "body": "Head for the hills!"
}
```

## Caching

Some browsers ignore Cache-control sometimes. To prevent this, always make the XHR with a extra search query of the current timestamp.
