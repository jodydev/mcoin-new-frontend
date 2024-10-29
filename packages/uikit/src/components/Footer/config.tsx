import { range } from "lodash";
import { Language } from "../LangSelector/types";
import { IoEarthSharp } from "react-icons/io5";
import { SiGitbook } from "react-icons/si";
import { FooterLinkType } from "./types";
import {
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
  InstagramIcon,
  GithubIcon,
  ResourcesIcon,
  DiscordIcon,
  MediumIcon,
  YoutubeIcon,
} from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.cyberglow.finance",
      },
      {
        label: "Blog",
        href: "https://medium.com/pancakeswap",
      },
      {
        label: "Community",
        href: "https://docs.cyberglow.finance",
      },
      {
        label: "CAKE",
        href: "https://docs.cyberglow.finance/tokenomics/cgt-token",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.pancakeswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.pancakeswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.pancakeswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.pancakeswap.finance/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/m20groupchat"
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/m20blockchain",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/m20chain/",
  },
  {
    label: "Medium",
    icon: IoEarthSharp,
    href: "https://m20chain.com/",
  },
  {
    label: "GitBook",
    icon: SiGitbook,
    href: "https://www.gitbook.com/@m20chain",
  },
  // {
  //   label: "Github",
  //   icon: GithubIcon,
  //   href: "/",
  // },
  // {
  //   label: "Medium",
  //   icon: MediumIcon,
  //   href: "https://medium.com/@CyberglowCS",
  // },
  // {
  //   label: "Docs",
  //   icon: ResourcesIcon,
  //   href: "https://docs.cyberglow.finance",
  // },
];

export const langs: Language[] = range(20).map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
