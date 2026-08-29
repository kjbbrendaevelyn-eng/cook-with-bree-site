import { getActiveSocialLinks, type SocialPlatform } from "@/lib/social";
import { QRCode } from "@/lib/qrcode";

const qrPlatforms: SocialPlatform[] = ["instagram", "youtube"];

const qrCaptions: Record<SocialPlatform, string> = {
  instagram: "Scan to follow on Instagram",
  youtube: "Scan to subscribe on YouTube",
  tiktok: "Scan to follow on TikTok",
};

function SocialQrCode({ url, caption }: { url: string; caption: string }) {
  const svg = QRCode.toSVG(url, {
    size: 160,
    margin: 2,
    color: "#3D2C29",
    background: "#FAF6EF",
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="rounded-xl border border-cream-200 bg-cream-100 p-3 shadow-sm"
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
        aria-label={caption}
      />
      <p className="text-sm text-warm-muted max-w-[10rem]">{caption}</p>
    </div>
  );
}

export default function SocialQrCodes({ className = "" }: { className?: string }) {
  const links = getActiveSocialLinks().filter(({ platform }) => qrPlatforms.includes(platform));

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap justify-center gap-8 ${className}`}>
      {links.map(({ platform, url }) => (
        <SocialQrCode key={platform} url={url} caption={qrCaptions[platform]} />
      ))}
    </div>
  );
}
