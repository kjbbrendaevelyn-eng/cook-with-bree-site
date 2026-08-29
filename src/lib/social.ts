export const socialLinks = {
  youtube: "https://www.youtube.com/@Cook-with-Bree",
  instagram: "https://www.instagram.com/cook.with.bree",
  tiktok: "",
} as const;

export type SocialPlatform = keyof typeof socialLinks;

export const socialLabels: Record<SocialPlatform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
};

export function getActiveSocialLinks(): { platform: SocialPlatform; url: string; label: string }[] {
  return (Object.entries(socialLinks) as [SocialPlatform, string][])
    .filter(([, url]) => url.trim() !== "")
    .map(([platform, url]) => ({
      platform,
      url,
      label: socialLabels[platform],
    }));
}
