# Cook with Bree — Product files

Digital products for sale (ebooks, meal plan PDFs). **Do not put paid files in `public/`** — upload them to Stripe, Gumroad, or Lemon Squeezy so only buyers can download.

## Ebook

| File | Product | Price |
|------|---------|-------|
| `ebooks/from-buziga-with-love.pdf` | From Buziga with Love | $15 |

Regenerate after updating stories/recipes:

```bash
npm run ebook:generate
```

Then paste the checkout URL into `src/lib/ebooks.ts` → `purchaseUrl`.

---

## Recommended: Gumroad (easiest PDF delivery)

Gumroad hosts the file and emails the download link automatically after payment.

1. Sign up / log in: https://gumroad.com  
2. **New product** → choose **Digital product**  
3. **Name:** From Buziga with Love  
4. **Price:** $15  
5. **Upload content:** choose `products/ebooks/from-buziga-with-love.pdf`  
6. Write a short description (stories + recipes from Uganda)  
7. **Publish** / make it live  
8. Copy the product URL (e.g. `https://bree.gumroad.com/l/from-buziga-with-love`)  
9. Paste into `src/lib/ebooks.ts`:

```ts
purchaseUrl: "https://yourname.gumroad.com/l/your-product",
```

Buyers pay → Gumroad emails them the PDF. Done.

---

## Alternative: Stripe Payment Link

Stripe is great for checkout, but **Payment Links do not attach files**. You either:

- Email the PDF manually after each sale, or  
- Use Stripe + an email tool / Zapier to send the file, or  
- Prefer **Gumroad** for automatic downloads

### Create via script (needs your secret key)

1. Create a Stripe account: https://dashboard.stripe.com/register  
2. Copy a secret key: https://dashboard.stripe.com/apikeys  
3. Create `.env.local` in the project root (never commit this file):

```bash
STRIPE_SECRET_KEY=sk_test_...   # use sk_live_... when ready for real sales
```

4. Run:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
node --env-file=.env.local scripts/create-stripe-ebook-product.mjs
```

5. Paste the printed payment link into `src/lib/ebooks.ts` → `purchaseUrl`  
6. Plan how buyers get the PDF (email attachment or switch to Gumroad)

---

## After purchase URL is set

The ebook page Buy button switches from **Coming soon** to **Buy & download ebook**.
