import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s',
  defaultTitle: 'Mcoin',
  description:
    '',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@',
    site: '@',
  },
  openGraph: {
    title: 'Mcoin',
    description:
      '',
    images: [{ url: 'https://Mcoin.finance/logo.png' }],
  },
}
