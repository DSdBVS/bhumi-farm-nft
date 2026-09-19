# Bhumi Farm — On-Chain Traceability Passport (NFT)

Part of Bhumi Farm's submission to the Colosseum Crypto World's Fair 2026 (Solana track).

## What this is

Bhumi Farm is building a fully enclosed, biosecure indoor frog farm in Thailand, producing
smoked frog legs as a verifiable, traceable RWA product. This repo mints an **on-chain
traceability passport** — a Metaplex NFT that carries the full production record for one
batch directly in its metadata: species, facility, biosecurity screening results (qPCR),
mortality vs. benchmark, feed source, and product form.

The idea: every real production batch gets one of these NFTs, minted at harvest, so a buyer
or auditor can verify the batch's record on-chain instead of trusting a claim on a label.

**This repo currently mints sample/demo data**, clearly marked as such in every record's
metadata (`"Record Type": "DEMO — Sample Data"`). It demonstrates the exact data structure
and mint flow the real system will use once the farm is operational — it is not a claim that
any physical batch behind these NFTs exists yet.

## Live example (Solana Devnet)

- Mint: [`FcKrpvFRjxDHV39P9ZJzVHeumb56ZK4TQRkQL6fvwePA`](https://explorer.solana.com/address/FcKrpvFRjxDHV39P9ZJzVHeumb56ZK4TQRkQL6fvwePA?cluster=devnet)
- Name: `Bhumi Passport 0001A`
- Standard: Metaplex Token Metadata (Master Edition, supply 1)

## What's in this repo

| File | Purpose |
|---|---|
| `mint-bhumi-passport-0001A.mjs` | Current mint script — uploads the real Bhumi Farm logo as the passport image, then mints the NFT. This produced the example above. |
| `mint-bhumi-passport.mjs` | Earlier version — uses a placeholder image URL instead of the real logo. Kept for reference. |
| `bhumi_logo_clean.png` | Bhumi Farm logo, used as the passport artwork. |
| `package.json` | Dependencies (Metaplex `umi` stack). |

## Stack

- [Metaplex Umi](https://developers.metaplex.com/umi) + [`mpl-token-metadata`](https://developers.metaplex.com/token-metadata) — NFT creation (`createNft`)
- [Irys uploader](https://developers.metaplex.com/umi/uploaders) — decentralized storage for the image + metadata JSON
- Solana Devnet

## Running it yourself

Requires a funded Solana devnet keypair. The script reads it from a local file path
(not committed to this repo — see `mint-bhumi-passport-0001A.mjs`, top of file, for the
expected path) via `solana-keygen new` / an existing devnet wallet JSON.

```bash
npm install
node mint-bhumi-passport-0001A.mjs
```

It prints the mint address and a Solana Explorer (devnet) link when done.

## Roadmap

- Wire this mint flow into the Bhumi Farm dashboard so a passport mints automatically at
  batch harvest, pulling real qPCR/biosecurity data instead of sample values.
- Add a `collection` NFT so all batch passports are grouped and verifiable as one series.
- Attach the passport mint address to the product's physical packaging (QR code) so a buyer
  can scan and verify on-chain before purchase.
