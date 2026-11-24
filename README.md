# csc-l402-mcp

Official L402-gated MCP Bridge for **CSC Web Relay (5 sats/req)** and **CSC Ephemeral S3 Vault (10 sats/24h lease)**.

Zero API keys. Zero KYC. Autonomous Bitcoin Lightning micropayments via HTTP 402.

## Endpoints
- **Web Relay (5 sats/req)**: https://csc-mcp-web-relay.independent-api-dev.workers.dev/mcp
- **Edge Vault S3 (10 sats/24h lease)**: https://csc-edge-vault-s3.independent-api-dev.workers.dev/mcp

## Usage (mcp.json)
    {
      "mcpServers": {
        "csc-l402-mcp": {
          "command": "npx",
          "args": ["-y", "csc-l402-mcp"],
          "env": { "L402_TOKEN": "YOUR_MACAROON:YOUR_PREIMAGE_HEX" }
        }
      }
    }