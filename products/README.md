# Cook with Bree — Product files

Digital products for sale (ebooks, meal plan PDFs). **Do not put paid files in `public/`** — upload them to Gumroad (or Stripe) so only buyers can download.

## Ebooks

| File | Product | Price | Suggested Gumroad URL |
|------|---------|-------|------------------------|
| `ebooks/from-buziga-with-love.pdf` | From Buziga with Love | $15 | `https://brendaevy.gumroad.com/l/from-buziga-with-love` |

```bash
npm run ebook:generate
```

## Meal plans

| File | Product | Price | Suggested Gumroad permalink |
|------|---------|-------|-----------------------------|
| `meal-plans/easy-african-inspired-dinners.pdf` | Easy African Inspired Dinners | $12 | https://brendaevy.gumroad.com/l/Easy-African-Inspired-Dinners |
| `meal-plans/special-dinner.pdf` | Special Dinner | $9 | https://brendaevy.gumroad.com/l/special-dinner |
| `meal-plans/romantic-ugandan-dinner.pdf` | Romantic Ugandan Dinner | $7 | https://brendaevy.gumroad.com/l/romantic-dinner-ideas |

```bash
npm run mealplans:generate
```

### Create Gumroad products (same flow as the ebook)

For each PDF:

1. Gumroad → **New product** → Digital product  
2. Set the **name** and **price** from the table above  
3. **Upload** the matching PDF from `products/meal-plans/`  
4. Set a clean permalink (e.g. `special-dinner`, not a file path)  
5. Publish and copy the link  
6. Paste into `src/lib/meal-plans.ts` → `purchaseUrl` for that plan  

Example:

```ts
purchaseUrl: "https://brendaevy.gumroad.com/l/special-dinner",
```

After all three links are set, Buy buttons on `/meal-plans` go live.
