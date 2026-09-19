// mint-bhumi-passport-0001A.mjs
// Bhumi Farm — on-chain traceability passport, Solana Devnet
// New record (0001A) minted with the real Bhumi Farm logo instead of the placeholder image.
//
// Run from ~/artha-nft:
//   cp ~/Downloads/mint-bhumi-passport-0001A.mjs ~/artha-nft/
//   cp ~/Downloads/bhumi_logo_clean.png ~/artha-nft/
//   cd ~/artha-nft
//   node mint-bhumi-passport-0001A.mjs

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox';
import { keypairIdentity, generateSigner, percentAmount, createGenericFile } from '@metaplex-foundation/umi';
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import fs from 'fs';

const umi = createUmi('https://api.devnet.solana.com').use(irysUploader()).use(mplToolbox());

const secretKey = JSON.parse(fs.readFileSync('/Users/igormezentsev/.config/solana/artha-devnet.json'));
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
umi.use(keypairIdentity(keypair));

const batchId = 'BHUMI-DEMO-0001A';
// On-chain "name" is capped at 32 bytes — keep it short.
const onChainName = 'Bhumi Passport 0001A';

async function main() {
  console.log('Uploading logo image...');
  const imgBuffer = fs.readFileSync('./bhumi_logo_clean.png');
  const imgFile = createGenericFile(imgBuffer, 'bhumi_logo_clean.png', { contentType: 'image/png' });
  const [imageUri] = await umi.uploader.upload([imgFile]);
  console.log('Image uploaded:', imageUri);

  const metadata = {
    name: `Bhumi Farm Passport — ${batchId}`,
    symbol: 'BHUMI',
    description:
      'SAMPLE / DEMO RECORD. This illustrates the on-chain traceability passport Bhumi Farm will attach to every real production batch once the farm is operating. It is not a claim that this batch physically exists yet.',
    image: imageUri,
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
      { trait_type: 'Passport Version', value: 'v0.2 — Colosseum demo' },
    ],
    properties: {
      files: [{ uri: imageUri, type: 'image/png' }],
      category: 'image',
    },
  };

  console.log('Uploading metadata JSON...');
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
  console.log('Explorer (devnet):', `https://explorer.solana.com/address/${mint.publicKey.toString()}?cluster=devnet`);
  console.log('Metadata JSON:', metadataUri);
  console.log('Image:', imageUri);
}

main().catch((err) => {
  console.error('Mint failed:', err);
  process.exit(1);
});
