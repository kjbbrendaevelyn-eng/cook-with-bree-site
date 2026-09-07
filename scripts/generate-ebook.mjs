/**
 * Generate the "From Buziga with Love" PDF ebook.
 * Output: products/ebooks/from-buziga-with-love.pdf (upload this to Stripe/Gumroad)
 *
 * Run: npm run ebook:generate
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "products/ebooks");
const outFile = path.join(outDir, "from-buziga-with-love.pdf");

const COLORS = {
  cream: "#FAF6EF",
  brown: "#3D2C29",
  muted: "#6B5E5A",
  terracotta: "#C4704B",
  sage: "#6B8F71",
  white: "#FFFFFF",
};

const STORIES = [
  "growing-up-in-uganda.md",
  "my-parents-love.md",
  "my-sister-salma.md",
  "chapati-and-rolex.md",
  "why-i-cook.md",
];

const RECIPES = [
  "matooke-with-groundnut-sauce.md",
  "chapati.md",
  "roasted-beef-luwombo.md",
  "english-peas-stew.md",
  "coconut-rice.md",
  "grandmas-banana-bread.md",
];

function readMarkdown(dir, filename) {
  const fullPath = path.join(root, "content", dir, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content: content.trim() };
}

function stripMarkdown(text) {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/^---$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensurePage(doc, minY = 72) {
  if (doc.y > doc.page.height - minY) {
    doc.addPage();
    drawPageChrome(doc);
  }
}

function drawPageChrome(doc) {
  doc.save();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.cream);
  doc.restore();
  doc.fillColor(COLORS.brown);
  doc.y = 64;
}

function drawFooter(doc, pageNum, totalHint) {
  const bottom = doc.page.height - 36;
  doc
    .font("Times-Italic")
    .fontSize(9)
    .fillColor(COLORS.muted)
    .text("Cook with Bree · From Buziga with Love", 56, bottom, {
      width: doc.page.width - 112,
      align: "left",
      lineBreak: false,
    });
  doc.text(String(pageNum), 56, bottom, {
    width: doc.page.width - 112,
    align: "right",
    lineBreak: false,
  });
}

function addCover(doc) {
  drawPageChrome(doc);
  doc
    .font("Times-Italic")
    .fontSize(12)
    .fillColor(COLORS.terracotta)
    .text("COOK WITH BREE", 56, 160, { align: "center", width: doc.page.width - 112 });

  doc
    .font("Times-Bold")
    .fontSize(36)
    .fillColor(COLORS.brown)
    .text("From Buziga with Love", 56, 200, {
      align: "center",
      width: doc.page.width - 112,
    });

  doc
    .font("Times-Italic")
    .fontSize(14)
    .fillColor(COLORS.muted)
    .text("Kitchen stories & recipes from Uganda and beyond", 56, 280, {
      align: "center",
      width: doc.page.width - 112,
    });

  doc
    .moveTo(200, 330)
    .lineTo(doc.page.width - 200, 330)
    .strokeColor(COLORS.sage)
    .lineWidth(1)
    .stroke();

  doc
    .font("Times-Roman")
    .fontSize(12)
    .fillColor(COLORS.muted)
    .text("A printable ebook from the Cook with Bree kitchen", 56, 360, {
      align: "center",
      width: doc.page.width - 112,
    });
}

function addWelcome(doc) {
  doc.addPage();
  drawPageChrome(doc);
  sectionTitle(doc, "Welcome");
  bodyText(
    doc,
    "This little book is a love letter to the kitchen I grew up in — and to the one I cook in now. Inside you'll find stories from Buziga, Kampala: my parents' open affection, my sister Salma, Friday folk tales, chapati and rolex — alongside recipes you can make at home.\n\nCook slowly. Taste often. Share generously.\n\nWith love,\nBree"
  );
}

function sectionTitle(doc, title) {
  ensurePage(doc, 120);
  doc
    .font("Times-Bold")
    .fontSize(22)
    .fillColor(COLORS.brown)
    .text(title, 56, doc.y, { width: doc.page.width - 112 });
  doc.moveDown(0.4);
  doc
    .moveTo(56, doc.y)
    .lineTo(180, doc.y)
    .strokeColor(COLORS.terracotta)
    .lineWidth(1.5)
    .stroke();
  doc.moveDown(1);
}

function partTitle(doc, label, title) {
  doc.addPage();
  drawPageChrome(doc);
  doc
    .font("Times-Italic")
    .fontSize(12)
    .fillColor(COLORS.terracotta)
    .text(label, 56, 200, { align: "center", width: doc.page.width - 112 });
  doc
    .font("Times-Bold")
    .fontSize(28)
    .fillColor(COLORS.brown)
    .text(title, 56, 230, { align: "center", width: doc.page.width - 112 });
}

function bodyText(doc, text) {
  const paragraphs = stripMarkdown(text).split(/\n\n+/);
  for (const para of paragraphs) {
    ensurePage(doc, 100);
    doc
      .font("Times-Roman")
      .fontSize(11)
      .fillColor(COLORS.muted)
      .text(para, 56, doc.y, {
        width: doc.page.width - 112,
        align: "left",
        lineGap: 3,
      });
    doc.moveDown(0.8);
  }
}

function addStory(doc, story) {
  doc.addPage();
  drawPageChrome(doc);
  doc
    .font("Times-Italic")
    .fontSize(10)
    .fillColor(COLORS.sage)
    .text("STORY", 56, doc.y);
  doc.moveDown(0.3);
  doc
    .font("Times-Bold")
    .fontSize(20)
    .fillColor(COLORS.brown)
    .text(story.frontmatter.title, 56, doc.y, { width: doc.page.width - 112 });
  doc.moveDown(0.4);
  if (story.frontmatter.description) {
    doc
      .font("Times-Italic")
      .fontSize(11)
      .fillColor(COLORS.muted)
      .text(story.frontmatter.description, 56, doc.y, { width: doc.page.width - 112 });
    doc.moveDown(0.8);
  }
  bodyText(doc, story.content);
}

function addRecipe(doc, recipe) {
  doc.addPage();
  drawPageChrome(doc);
  doc
    .font("Times-Italic")
    .fontSize(10)
    .fillColor(COLORS.terracotta)
    .text("RECIPE", 56, doc.y);
  doc.moveDown(0.3);
  doc
    .font("Times-Bold")
    .fontSize(20)
    .fillColor(COLORS.brown)
    .text(recipe.frontmatter.title, 56, doc.y, { width: doc.page.width - 112 });
  doc.moveDown(0.3);

  const meta = [
    recipe.frontmatter.prepTime && `Prep ${recipe.frontmatter.prepTime}`,
    recipe.frontmatter.cookTime && `Cook ${recipe.frontmatter.cookTime}`,
    recipe.frontmatter.servings && `Serves ${recipe.frontmatter.servings}`,
  ]
    .filter(Boolean)
    .join(" · ");

  if (meta) {
    doc.font("Times-Roman").fontSize(10).fillColor(COLORS.sage).text(meta, 56, doc.y);
    doc.moveDown(0.5);
  }

  if (recipe.frontmatter.description) {
    doc
      .font("Times-Italic")
      .fontSize(11)
      .fillColor(COLORS.muted)
      .text(recipe.frontmatter.description, 56, doc.y, { width: doc.page.width - 112 });
    doc.moveDown(0.8);
  }

  bodyText(doc, recipe.content);
}

function addClosing(doc) {
  doc.addPage();
  drawPageChrome(doc);
  sectionTitle(doc, "Thank you");
  bodyText(
    doc,
    "Thank you for supporting Cook with Bree. Every download helps me keep sharing recipes and stories from this kitchen.\n\nFind more free recipes and stories at the Cook with Bree website — and come say hello on YouTube and Instagram @cook.with.bree / Cook with Bree.\n\nNow go cook something that matters."
  );
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const stories = STORIES.map((f) => readMarkdown("stories", f));
  const recipes = RECIPES.map((f) => readMarkdown("recipes", f));

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 64, bottom: 56, left: 56, right: 56 },
    info: {
      Title: "From Buziga with Love",
      Author: "Bree · Cook with Bree",
      Subject: "Kitchen stories and recipes from Uganda and beyond",
    },
  });

  const stream = fs.createWriteStream(outFile);
  doc.pipe(stream);

  let pageCount = 0;
  doc.on("pageAdded", () => {
    pageCount += 1;
  });

  addCover(doc);
  pageCount = 1;
  addWelcome(doc);

  partTitle(doc, "PART ONE", "Stories from the Kitchen");
  for (const story of stories) {
    addStory(doc, story);
  }

  partTitle(doc, "PART TWO", "Recipes to Cook");
  for (const recipe of recipes) {
    addRecipe(doc, recipe);
  }

  addClosing(doc);

  // Simple page numbers on each page via buffer end — PDFKit doesn't easily renumber;
  // footers drawn as we go would need pageAdded hooks. Add a light footer on switch:
  // For simplicity, skip dynamic footers beyond cover branding in content.

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  const sizeKb = Math.round(fs.statSync(outFile).size / 1024);
  console.log(`Created ${outFile} (${sizeKb} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
