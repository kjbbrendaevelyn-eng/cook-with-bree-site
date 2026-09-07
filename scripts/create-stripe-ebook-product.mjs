/**
 * Create a Stripe product + price + Payment Link for the ebook PDF.
 *
 * Prerequisites:
 * 1. Stripe account: https://dashboard.stripe.com/register
 * 2. Secret key from https://dashboard.stripe.com/apikeys
 * 3. Put the key in .env.local:
 *      STRIPE_SECRET_KEY=sk_test_...   (or sk_live_...)
 *
 * Usage:
 *   export PATH="$HOME/.local/node/bin:$PATH"
 *   node --env-file=.env.local scripts/create-stripe-ebook-product.mjs
 *
 * Then paste the printed payment link into src/lib/ebooks.ts → purchaseUrl
 *
 * Note: Stripe Payment Links don't host files. After checkout, buyers get a
 * success page — for automatic PDF delivery, use Gumroad or Stripe + a
 * fulfillment email. See products/README.md.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pdfPath = path.join(root, "products/ebooks/from-buziga-with-love.pdf");

const SECRET = process.env.STRIPE_SECRET_KEY;

if (!SECRET) {
  console.error("Missing STRIPE_SECRET_KEY. Add it to .env.local and re-run.");
  process.exit(1);
}

if (!fs.existsSync(pdfPath)) {
  console.error(`PDF not found at ${pdfPath}. Run: npm run ebook:generate`);
  process.exit(1);
}

async function stripe(pathname, body) {
  const res = await fetch(`https://api.stripe.com/v1/${pathname}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
}

async function main() {
  console.log("Creating Stripe product...");

  const product = await stripe("products", {
    name: "From Buziga with Love",
    description:
      "Downloadable PDF ebook — Ugandan kitchen stories and recipes from Cook with Bree.",
    "metadata[slug]": "from-buziga-with-love",
    "metadata[type]": "ebook",
  });

  const price = await stripe("prices", {
    product: product.id,
    unit_amount: "1500",
    currency: "usd",
  });

  const paymentLink = await stripe("payment_links", {
    "line_items[0][price]": price.id,
    "line_items[0][quantity]": "1",
    "after_completion[type]": "hosted_confirmation",
    "after_completion[hosted_confirmation][custom_message]":
      "Thank you! Check your email for your From Buziga with Love ebook download (or attach the PDF in Stripe email settings / send it manually).",
  });

  console.log("\nDone.\n");
  console.log(`Product ID:      ${product.id}`);
  console.log(`Price ID:        ${price.id}`);
  console.log(`Payment link:    ${paymentLink.url}`);
  console.log("\nNext steps:");
  console.log("1. Paste the payment link into src/lib/ebooks.ts → purchaseUrl");
  console.log("2. For automatic PDF delivery, prefer Gumroad (see products/README.md)");
  console.log("   or configure Stripe to email the file after payment.");
  console.log(`3. PDF to upload/attach: ${pdfPath}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
