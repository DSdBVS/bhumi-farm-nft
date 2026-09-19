// mint-bhumi-passport.mjs
// Bhumi Farm — on-chain traceability passport, Solana Devnet
// Mints one NFT per batch. The metadata below is clearly marked as SAMPLE/DEMO data —
// it shows the exact data structure and verification flow the real system will use once
// the farm is operating. Do not present this as a real harvested batch.
//
// Run this in your own Terminal (not through Claude's sandbox) from inside ~/artha-nft,
// which already has the required packages installed and your funded devnet keypair.
//
//   cd ~/artha-nft
//   node mint-bhumi-passport.mjs
//
// It prints the mint address and a Solscan devnet link when done — send both back.

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox';
import { keypairIdentity, generateSigner, percentAmount } from '@metaplex-foundation/umi';
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import fs from 'fs';

const umi = createUmi('https://api.devnet.solana.com').use(irysUploader()).use(mplToolbox());

const secretKey = JSON.parse(fs.readFileSync('/Users/igormezentsev/.config/solana/artha-devnet.json'));
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
umi.use(keypairIdentity(keypair));

const batchId = 'BHUMI-DEMO-0001';
// On-chain "name" is hard-capped at 32 bytes by Metaplex Token Metadata — keep it short.
// The full descriptive name lives in the off-chain metadata JSON instead, no length limit there.
const onChainName = 'Bhumi Passport 0001';

const metadata = {
  name: `Bhumi Farm Passport — ${batchId}`,
  symbol: 'BHUMI',
  description:
    'SAMPLE / DEMO RECORD. This illustrates the on-chain traceability passport Bhumi Farm will attach to every real production batch once the farm is operating. It is not a claim that this batch physically exists yet.',
  image:
    'https://placehold.co/800x800/1a3a2e/f4f1ea/png?text=BHUMI+FARM%0ATraceability+Passport',
  attributes: [
    { trait_type: 'Record Type', value: 'DEMO — Sample Data' },
    { trait_type: 'Batch ID', value: batchId },
    { trait_type: 'Species', value: 'Hoplobatrachus rugulosus' },
    { trait_type: 'Facility', value: 'Fully enclosed indoor farm, Thailand (planned)' },
    { trait_type: 'DOF Registration (ทบ.1)', value: 'Pending — filed on facility start' },
    { trait_type: 'Biosecurity Tier', value: 'Eliminated / Controlled / Verified' },
    { trait_type: 'qPCR Bd Screen', value: 'Negative (sample result)' },
    { trait_type: 'qPCR Ranavirus Screen', value: 'Negative (sample result)' },
    { trait_type: 'Mortality vs Benchmark', value: 'Sample: 3.2% (benchmark 5%)' },
    { trait_type: 'Feed Source', value: 'Single-source, dedicated (planned)' },
    { trait_type: 'Product', value: 'Smoked frog legs, vacuum-packed' },
    { trait_type: 'Passport Version', value: 'v0.1 — Colosseum demo' },
  ],
  properties: {
    files: [],
    category: 'image',
  },
};

async function main() {
  console.log('Uploading passport metadata for', batchId, '...');
  const metadataUri = await umi.uploader.uploadJson(metadata);
  console.log('Metadata uploaded:', metadataUri);

  console.log('Minting traceability passport NFT...');
  const mint = generateSigner(umi);
  await createNft(umi, {
    mint,
    name: onChainName,
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(0),
  }).sendAndConfirm(umi);

  console.log('');
  console.log('DONE.');
  console.log('Mint address:', mint.publicKey.toString());
  console.log('Solscan (devnet):', `https://solscan.io/token/${mint.publicKey.toString()}?cluster=devnet`);
  console.log('Metadata JSON:', metadataUri);
}

main().catch((err) => {
  console.error('Mint failed:', err);
  process.exit(1);
});
