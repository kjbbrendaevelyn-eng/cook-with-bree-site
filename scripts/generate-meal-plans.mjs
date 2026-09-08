/**
 * Generate printable meal plan PDFs for Gumroad / Stripe upload.
 * Output: products/meal-plans/*.pdf
 *
 * Run: npm run mealplans:generate
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "products/meal-plans");

const COLORS = {
  cream: "#FAF6EF",
  brown: "#3D2C29",
  muted: "#6B5E5A",
  terracotta: "#C4704B",
  sage: "#6B8F71",
};

const plans = [
  {
    slug: "easy-african-inspired-dinners",
    title: "Easy African Inspired Dinners",
    subtitle: "A 7-day printable meal plan from Cook with Bree",
    priceLabel: "$12",
    servings: "Feeds 2–4",
    intro:
      "Seven comforting dinners inspired by the flavors I grew up with in Uganda — chapati nights, pea stew, coconut rice, and simple sides — planned so you can cook after work without stress.",
    days: [
      {
        day: "Monday",
        meal: "English Peas Stew with Coconut Rice",
        notes: "Start the rice cooker first, then simmer the stew. Leftover stew keeps well for lunch.",
      },
      {
        day: "Tuesday",
        meal: "Chapati Night with Leftover Stew",
        notes: "Warm leftover peas stew. Make a half batch of chapati if you're short on time.",
      },
      {
        day: "Wednesday",
        meal: "Cozy Chicken & Vegetable Soup",
        notes: "One-pot night. Freeze any extra portions without pasta for later.",
      },
      {
        day: "Thursday",
        meal: "Lemon Garlic Pasta",
        notes: "20-minute win. Add a simple green salad if you have energy.",
      },
      {
        day: "Friday",
        meal: "Honey Roasted Root Vegetables + Sandwich Bread Toast",
        notes: "Sheet-pan vegetables. Toast leftover sandwich bread with butter.",
      },
      {
        day: "Saturday",
        meal: "Roasted Beef Luwombo with Matooke (or mashed plantain/potato)",
        notes: "Weekend project dinner. Start early — luwombo rewards patience.",
      },
      {
        day: "Sunday",
        meal: "Grandma's Banana Bread + Soup Leftovers",
        notes: "Bake banana bread for the week. Reheat Wednesday's soup for an easy night.",
      },
    ],
    grocery: {
      Produce: [
        "Onions (4)",
        "Garlic (2 heads)",
        "Tomatoes (6) or canned crushed tomatoes",
        "Carrots (1 bag)",
        "Celery (1 bunch)",
        "Lemons (3)",
        "Sweet potatoes / root vegetables for roasting",
        "Fresh herbs (parsley or cilantro)",
        "Bananas (very ripe, for banana bread)",
        "Green cooking bananas / plantains if making matooke",
      ],
      Pantry: [
        "Jasmine or long-grain rice",
        "All-purpose flour",
        "Pasta (spaghetti or linguine)",
        "Coconut milk (2 cans, full-fat)",
        "Peanut butter (natural) or groundnuts",
        "Tomato paste",
        "Vegetable or chicken stock",
        "Curry powder, cumin, paprika, cinnamon",
        "Honey, brown sugar, salt, oil/butter",
        "Active dry yeast (if baking sandwich bread)",
      ],
      Protein: ["Chicken thighs (1–2 lb)", "Beef stew meat (2 lb) for luwombo", "Eggs", "Plain or Greek yogurt"],
      Other: ["Banana leaves or foil (for luwombo/matooke)", "Frozen English peas (3 cups)"],
    },
    prep: [
      "Sunday evening: chop onions/garlic for the week; store in airtight containers.",
      "Cook a double batch of coconut rice midweek if you want faster dinners.",
      "Freeze soup in lunch portions without pasta.",
      "Chapati dough can rest while you prep the stew.",
    ],
    recipeLinks: [
      "English Peas Stew — /recipes/english-peas-stew",
      "Coconut Rice — /recipes/coconut-rice",
      "Chapati — /recipes/chapati",
      "Cozy Chicken Soup — /recipes/cozy-chicken-soup",
      "Lemon Garlic Pasta — /recipes/lemon-garlic-pasta",
      "Honey Roasted Vegetables — /recipes/honey-roasted-vegetables",
      "Roasted Beef Luwombo — /recipes/roasted-beef-luwombo",
      "Matooke with Groundnut Sauce — /recipes/matooke-with-groundnut-sauce",
      "Grandma's Banana Bread — /recipes/grandmas-banana-bread",
    ],
  },
  {
    slug: "special-dinner",
    title: "Special Dinner",
    subtitle: "A printable celebration menu from Cook with Bree",
    priceLabel: "$9",
    servings: "Feeds 2–6",
    intro:
      "When dinner should feel like an occasion — birthdays, guests, or a slow Sunday — this menu gives you a clear shopping list and timeline so you can enjoy the evening too.",
    menu: [
      { course: "Starter", dish: "Honey Roasted Root Vegetables (small plates)", timing: "Roast while main rests" },
      { course: "Main", dish: "Roasted Beef Luwombo", timing: "Start 2.5–3 hours before serving" },
      { course: "Side", dish: "Matooke with Groundnut Sauce or Coconut Rice", timing: "Steam / cook alongside main" },
      { course: "Bread", dish: "Warm Chapati or Sandwich Bread", timing: "Finish 20 minutes before serving" },
      { course: "Sweet", dish: "Grandma's Banana Bread with butter", timing: "Bake earlier in the day" },
    ],
    timeline: [
      { time: "T-3 hours", task: "Marinate beef; prep banana leaves/parcels for luwombo; preheat oven if roasting finish." },
      { time: "T-2.5 hours", task: "Start cooking luwombo low and covered." },
      { time: "T-2 hours", task: "Bake banana bread (or earlier). Set the table." },
      { time: "T-1 hour", task: "Start matooke steamer or coconut rice. Prep groundnut sauce if using." },
      { time: "T-45 min", task: "Toss root vegetables with honey and oil; roast." },
      { time: "T-30 min", task: "Make chapati or warm sandwich bread. Finish sauce." },
      { time: "T-10 min", task: "Plate starter vegetables; rest the meat; fluff rice/matooke." },
      { time: "Serve", task: "Bring everything to the table warm. Light a candle. Enjoy." },
    ],
    grocery: {
      Produce: [
        "Onions, garlic, ginger, tomatoes",
        "Sweet potatoes, carrots, parsnips or mixed roots",
        "Fresh rosemary or parsley",
        "Ripe bananas for banana bread",
        "Green bananas/plantains if making matooke",
      ],
      Pantry: [
        "Coconut milk or peanut butter for sauce",
        "Rice or flour for chapati/bread",
        "Honey, spices (coriander, cumin, paprika, cinnamon)",
        "Tomato paste, stock, oil/butter, sugar, flour, baking soda",
      ],
      Protein: ["Beef stew meat (about 2 lb)", "Eggs", "Butter/yogurt for baking"],
      Other: ["Banana leaves or parchment + kitchen twine", "Candles / nice serving dishes (optional)"],
    },
    prep: [
      "Bake banana bread the morning of — one less thing at dinner hour.",
      "Chop all aromatics before guests arrive.",
      "Don't open the luwombo pot too often — trust the timeline.",
    ],
    recipeLinks: [
      "Roasted Beef Luwombo — /recipes/roasted-beef-luwombo",
      "Matooke with Groundnut Sauce — /recipes/matooke-with-groundnut-sauce",
      "Coconut Rice — /recipes/coconut-rice",
      "Honey Roasted Vegetables — /recipes/honey-roasted-vegetables",
      "Chapati — /recipes/chapati",
      "Grandma's Banana Bread — /recipes/grandmas-banana-bread",
    ],
  },
  {
    slug: "romantic-ugandan-dinner",
    title: "Romantic Ugandan Dinner",
    subtitle: "A date-night printable plan for two · Cook with Bree",
    priceLabel: "$7",
    servings: "Dinner for 2",
    intro:
      "Inspired by my parents — who loved each other so openly that Valentine's Day felt like a holiday in our house. This is a warm Ugandan-inspired dinner for two: flavorful, unhurried, and meant to be shared.",
    menu: [
      { course: "Together", dish: "Chapati (make side by side)", timing: "Start together — it's part of the date" },
      { course: "Main", dish: "English Peas Stew (smaller pot)", timing: "Simmer while chapati rests/cooks" },
      { course: "Side", dish: "Coconut Rice (rice cooker)", timing: "Press start before you begin chapati" },
      { course: "Sweet", dish: "Warm banana bread slices with butter", timing: "Bake earlier or use leftovers" },
    ],
    timeline: [
      { time: "Afternoon", task: "Bake banana bread if you don't have any. Put flowers or a candle on the table." },
      { time: "T-60 min", task: "Start coconut rice in the rice cooker." },
      { time: "T-50 min", task: "Sauté onion for pea stew; build the tomato gravy." },
      { time: "T-40 min", task: "Add peas and simmer. Mix chapati dough; let rest 20–30 minutes." },
      { time: "T-20 min", task: "Roll and cook chapatis together. Keep them warm in foil." },
      { time: "T-5 min", task: "Fluff rice. Taste stew. Plate family-style." },
      { time: "Serve", task: "Sit down. Phones away. Eat with your hands if you want — that's home." },
    ],
    grocery: {
      Produce: ["1 onion", "Garlic", "2 tomatoes", "Fresh herbs", "Ripe bananas (optional baking)"],
      Pantry: [
        "Frozen English peas (2–3 cups)",
        "Coconut milk (1 can)",
        "Rice (1 cup dry is plenty for two)",
        "Flour, oil, salt for chapati",
        "Curry powder, cumin, paprika, tomato paste",
      ],
      Other: ["Butter for banana bread / finishing", "Candle or small flowers"],
    },
    prep: [
      "Shop the day before so the evening stays calm.",
      "Cook together — assign one person rice/stew and one person chapati.",
      "Keep the menu small. Romance is in the pace, not the course count.",
    ],
    recipeLinks: [
      "English Peas Stew — /recipes/english-peas-stew",
      "Coconut Rice — /recipes/coconut-rice",
      "Chapati — /recipes/chapati",
      "Grandma's Banana Bread — /recipes/grandmas-banana-bread",
      "Story: My Parents' Love — /stories/my-parents-love",
    ],
  },
];

function drawChrome(doc) {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.cream);
  doc.fillColor(COLORS.brown);
  doc.y = 64;
}

function ensureSpace(doc, need = 80) {
  if (doc.y > doc.page.height - need) {
    doc.addPage();
    drawChrome(doc);
  }
}

function h1(doc, text) {
  doc.font("Times-Bold").fontSize(24).fillColor(COLORS.brown).text(text, 56, doc.y, {
    width: doc.page.width - 112,
  });
  doc.moveDown(0.4);
}

function h2(doc, text) {
  ensureSpace(doc, 100);
  doc.moveDown(0.6);
  doc.font("Times-Bold").fontSize(16).fillColor(COLORS.brown).text(text, 56, doc.y, {
    width: doc.page.width - 112,
  });
  doc
    .moveTo(56, doc.y + 2)
    .lineTo(160, doc.y + 2)
    .strokeColor(COLORS.terracotta)
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.8);
}

function body(doc, text) {
  ensureSpace(doc, 80);
  doc.font("Times-Roman").fontSize(11).fillColor(COLORS.muted).text(text, 56, doc.y, {
    width: doc.page.width - 112,
    lineGap: 3,
  });
  doc.moveDown(0.6);
}

function bullet(doc, text) {
  ensureSpace(doc, 60);
  doc.font("Times-Roman").fontSize(11).fillColor(COLORS.muted).text(`•  ${text}`, 56, doc.y, {
    width: doc.page.width - 112,
    lineGap: 2,
  });
  doc.moveDown(0.35);
}

function cover(doc, plan) {
  drawChrome(doc);
  doc
    .font("Times-Italic")
    .fontSize(11)
    .fillColor(COLORS.terracotta)
    .text("COOK WITH BREE · PRINTABLE MEAL PLAN", 56, 150, {
      align: "center",
      width: doc.page.width - 112,
    });
  doc
    .font("Times-Bold")
    .fontSize(28)
    .fillColor(COLORS.brown)
    .text(plan.title, 56, 190, { align: "center", width: doc.page.width - 112 });
  doc
    .font("Times-Italic")
    .fontSize(13)
    .fillColor(COLORS.muted)
    .text(plan.subtitle, 56, 260, { align: "center", width: doc.page.width - 112 });
  doc
    .font("Times-Roman")
    .fontSize(12)
    .fillColor(COLORS.sage)
    .text(`${plan.servings}  ·  ${plan.priceLabel}`, 56, 320, {
      align: "center",
      width: doc.page.width - 112,
    });
}

function writePlan(plan) {
  const outFile = path.join(outDir, `${plan.slug}.pdf`);
  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 64, bottom: 56, left: 56, right: 56 },
    info: {
      Title: plan.title,
      Author: "Bree · Cook with Bree",
      Subject: plan.subtitle,
    },
  });
  const stream = fs.createWriteStream(outFile);
  doc.pipe(stream);

  cover(doc, plan);

  doc.addPage();
  drawChrome(doc);
  h1(doc, "Welcome");
  body(doc, plan.intro);
  body(
    doc,
    "Print this plan, stick it on the fridge, and shop once. Recipes live on the Cook with Bree website — use the links at the end when you need full instructions."
  );

  if (plan.days) {
    h2(doc, "7-Day Dinner Calendar");
    for (const d of plan.days) {
      ensureSpace(doc, 90);
      doc.font("Times-Bold").fontSize(12).fillColor(COLORS.terracotta).text(d.day, 56, doc.y);
      doc.font("Times-Bold").fontSize(12).fillColor(COLORS.brown).text(d.meal, 56, doc.y, {
        width: doc.page.width - 112,
      });
      doc.font("Times-Italic").fontSize(10).fillColor(COLORS.muted).text(d.notes, 56, doc.y, {
        width: doc.page.width - 112,
      });
      doc.moveDown(0.7);
    }
  }

  if (plan.menu) {
    h2(doc, "Menu");
    for (const m of plan.menu) {
      ensureSpace(doc, 70);
      doc.font("Times-Bold").fontSize(12).fillColor(COLORS.terracotta).text(m.course, 56, doc.y);
      doc.font("Times-Bold").fontSize(12).fillColor(COLORS.brown).text(m.dish, 56, doc.y, {
        width: doc.page.width - 112,
      });
      doc.font("Times-Italic").fontSize(10).fillColor(COLORS.muted).text(m.timing, 56, doc.y, {
        width: doc.page.width - 112,
      });
      doc.moveDown(0.6);
    }
  }

  if (plan.timeline) {
    h2(doc, "Cooking Timeline");
    for (const t of plan.timeline) {
      ensureSpace(doc, 60);
      doc.font("Times-Bold").fontSize(11).fillColor(COLORS.sage).text(t.time, 56, doc.y);
      doc.font("Times-Roman").fontSize(11).fillColor(COLORS.muted).text(t.task, 56, doc.y, {
        width: doc.page.width - 112,
      });
      doc.moveDown(0.45);
    }
  }

  h2(doc, "Grocery List");
  for (const [section, items] of Object.entries(plan.grocery)) {
    ensureSpace(doc, 80);
    doc.font("Times-Bold").fontSize(12).fillColor(COLORS.brown).text(section, 56, doc.y);
    doc.moveDown(0.3);
    for (const item of items) bullet(doc, item);
    doc.moveDown(0.3);
  }

  h2(doc, "Prep Tips");
  for (const tip of plan.prep) bullet(doc, tip);

  h2(doc, "Recipe Links on Cook with Bree");
  for (const link of plan.recipeLinks) bullet(doc, link);

  doc.addPage();
  drawChrome(doc);
  h1(doc, "Thank you");
  body(
    doc,
    "Thank you for supporting Cook with Bree. Print this plan whenever you need it — no subscription, no fuss.\n\nFind more free recipes and stories on the website, and come say hello on YouTube and Instagram.\n\nWith love,\nBree"
  );

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      const kb = Math.round(fs.statSync(outFile).size / 1024);
      console.log(`Created ${outFile} (${kb} KB)`);
      resolve(outFile);
    });
    stream.on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const plan of plans) {
    await writePlan(plan);
  }
  console.log("\nNext: upload each PDF to Gumroad, then paste purchase URLs into src/lib/meal-plans.ts");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
