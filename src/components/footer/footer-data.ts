import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  type Icon,
} from "@tabler/icons-react";
import { siteConfig } from "@/config/site";

/* -------------------------------------------------------------------------
 * Footer copy and links. Replace the text and hrefs with your own. The
 * product name, tagline and legal name follow `siteConfig`, so a rebrand
 * there carries through. Hrefs that start with `#` jump to a section on the
 * page; swap them for real routes as your site grows.
 * ---------------------------------------------------------------------- */

export type FooterLink = { label: string; href: string };

export type FooterGroup = {
  /** Visible heading and the accessible name of the list. */
  title: string;
  links: FooterLink[];
};

export type FooterSocial = {
  /** Accessible name, since the link shows only an icon. */
  label: string;
  href: string;
  icon: Icon;
};

export type FooterContent = {
  /** Screen-reader heading for the whole footer landmark. */
  srHeading: string;
  description: string;
  status: { label: string; href: string };
  socials: FooterSocial[];
  navLabel: string;
  groups: FooterGroup[];
  /** Legal entity shown in the copyright line. */
  legalName: string;
  backToTop: string;
};

export const footerContent: FooterContent = {
  srHeading: "Footer",
  description:
    "Databases, queues and cron jobs on one control plane, built for small teams that ship fast.",
  status: { label: "All systems operational", href: "#" },
  socials: [
    {
      label: `${siteConfig.name} on GitHub`,
      href: "#",
      icon: IconBrandGithub,
    },
    { label: `${siteConfig.name} on X`, href: "#", icon: IconBrandX },
    {
      label: `${siteConfig.name} on Discord`,
      href: "#",
      icon: IconBrandDiscord,
    },
    {
      label: `${siteConfig.name} on LinkedIn`,
      href: "#",
      icon: IconBrandLinkedin,
    },
  ],
  navLabel: "Footer",
  groups: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API reference", href: "#" },
        { label: "CLI", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Customers", href: "#testimonials" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
        { label: "DPA", href: "#" },
      ],
    },
  ],
  legalName: `${siteConfig.name}, Inc.`,
  backToTop: "Back to top",
};
