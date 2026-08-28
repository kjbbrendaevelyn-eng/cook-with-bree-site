#!/usr/bin/env python3
"""Generate Cook with Bree favicon PNGs — bold B, sage steam, cream background."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT_PATH = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"

CREAM = (250, 246, 239)
TERRACOTTA = (196, 112, 75)
SAGE = (107, 143, 113)

CANVAS = 32
CORNER_RADIUS = 6


def _scale(size: int) -> float:
    return size / CANVAS


def _draw_background(draw: ImageDraw.ImageDraw, size: int) -> None:
    radius = max(1, round(CORNER_RADIUS * _scale(size)))
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=CREAM)


def _draw_steam(draw: ImageDraw.ImageDraw, size: int) -> None:
    s = _scale(size)
    stroke = max(2, round(2.2 * s))

    wisps = [
        ((10.5, 7.0), (9.0, 4.5), (11.5, 2.8), (12.5, 5.0)),
        ((16.0, 6.5), (14.5, 4.0), (17.0, 2.2), (18.0, 4.5)),
        ((21.5, 7.0), (20.0, 4.5), (22.5, 2.8), (23.5, 5.0)),
    ]

    for p0, p1, p2, p3 in wisps:
        points = []
        steps = max(16, int(28 * s))
        for i in range(steps + 1):
            t = i / steps
            u = 1 - t
            x = u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0]
            y = u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1]
            points.append((x * s, y * s))
        draw.line(points, fill=SAGE, width=stroke, joint="curve")


def _draw_b(draw: ImageDraw.ImageDraw, size: int) -> None:
    s = _scale(size)
    font_size = round(17.5 * s)
    font = ImageFont.truetype(FONT_PATH, font_size)

    # Center B in lower portion of icon
    bbox = draw.textbbox((0, 0), "B", font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (size - text_w) / 2 - bbox[0]
    y = (size * 0.52) - text_h / 2 - bbox[1]
    draw.text((x, y), "B", font=font, fill=TERRACOTTA)


def render_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    _draw_background(draw, size)
    _draw_steam(draw, size)
    _draw_b(draw, size)
    return img


def main() -> None:
    outputs = {
        ROOT / "src/app/icon.png": 512,
        ROOT / "src/app/apple-icon.png": 180,
        ROOT / "public/favicon.png": 48,
    }

    for path, px in outputs.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        render_icon(px).save(path, format="PNG", optimize=True)
        print(f"Wrote {path} ({px}x{px})")


if __name__ == "__main__":
    main()
