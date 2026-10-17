/**
 * Single place to rebrand the template. Swap the product name, CLI command,
 * domain and copy here; every section reads from this file.
 */
export const siteConfig = {
  name: "Stackline",
  command: "stackline",
  domain: "stackline.app",
  tagline: "The backend platform that gets out of your way",
  description:
    "Databases, queues and cron jobs on one control plane for small teams that ship fast.",
} as const;
