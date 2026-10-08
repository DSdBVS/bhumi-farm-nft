# Bhumi Farm — On-Chain Traceability Passport

A Solana-based traceability passport for Bhumi Farm production batches, connecting
physical food products to human-readable batch records and verifiable on-chain NFTs.

[Live Demo](https://bhumifarm.com/passport.html) ·
[Solana Explorer](https://explorer.solana.com/address/FxoSBXSasQ8EsE4knjxFQQGpuU5G7Zefhdi3vN9cDXxS?cluster=devnet) ·
[Bhumi Farm](https://bhumifarm.com)

## What it is

Bhumi Farm is developing a fully enclosed, biosecure indoor frog farm in Thailand,
with Bhumi Food as the consumer-facing food brand.

This repository implements an on-chain traceability passport using a Metaplex NFT
on Solana. The passport represents the production record for a batch and can contain
information such as species, facility, biosecurity screening, mortality, feed source,
and product form.

The current implementation is a **Solana Devnet prototype using sample/demo data**.
The farm and production facility are planned and the current NFT does not represent
a real commercial production batch.

## Live Demo

**Batch Passport:** https://bhumifarm.com/passport.html

- **Batch:** `BHF-2026-0091`
- **Product:** Smoked Frog Legs
- **Species:** `Hoplobatrachus rugulosus`
- **Network:** Solana Devnet
- **NFT:** `FxoSBXSasQ8EsE4knjxFQQGpuU5G7Zefhdi3vN9cDXxS`

The physical product demonstration uses a QR code that opens the Batch Passport.
The passport presents the batch information and links to the corresponding Solana
Devnet NFT.

### Current demo NFT

**Mint:** `FxoSBXSasQ8EsE4knjxFQQGpuU5G7Zefhdi3vN9cDXxS`

[View on Solana Explorer](https://explorer.solana.com/address/FxoSBXSasQ8EsE4knjxFQQGpuU5G7Zefhdi3vN9cDXxS?cluster=devnet)

[View on Solscan](https://solscan.io/token/FxoSBXSasQ8EsE4knjxFQQGpuU5G7Zefhdi3vN9cDXxS?cluster=devnet)

## How it works

Physical product
↓
QR code
↓
Batch Passport webpage
↓
Traceability information
↓
Solana Devnet NFT
