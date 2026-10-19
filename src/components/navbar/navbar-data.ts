export type NavLink = { label: string; href: string };

export type NavbarContent = {
  links: NavLink[];
  signIn: NavLink;
  cta: NavLink;
};

/**
 * Navbar copy and links. Anchor links point at the section ids that will
 * exist further down the page; swap them for real routes as needed.
 */
export const navbarContent: NavbarContent = {
  links: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ],
  signIn: { label: "Sign in", href: "#" },
  cta: { label: "Start building", href: "#" },
};
