// schemas/aboutUs.js

import { Globe, ShieldCheck, Handshake } from 'lucide-react'; // Icons for illustration (optional for Sanity)

export default {
  name: 'aboutUs',
  title: 'About Us Section',
  type: 'document',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'The title displayed in the About Us section (e.g., "Why Choose Us?")',
    },
    {
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      description: 'A short description of the About Us section',
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'cardTitle',
              type: 'string',
              title: 'Card Title',
            },
            {
              name: 'cardDescription',
              type: 'text',
              title: 'Card Description',
            },
            {
              name: 'cardIcon',
              title: 'Card Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Globe', value: 'Globe' },
                  { title: 'ShieldCheck', value: 'ShieldCheck' },
                  { title: 'Handshake', value: 'Handshake' },
                ],
              },
              description: 'Select an icon for the card',
            },
          ],
        },
      ],
      description: 'An array of cards displayed in the "Why Choose Us" section.',
    },
    {
      name: 'affiliateSectionTitle',
      title: 'Affiliate Section Title',
      type: 'string',
      description: 'Title for the affiliate program section (e.g., "Make Money with UZA")',
    },
    {
      name: 'affiliateSectionDescription',
      title: 'Affiliate Section Description',
      type: 'text',
      description: 'Description for the affiliate program section',
    },
    {
      name: 'affiliateCtaLink',
      title: 'Affiliate Call to Action Link',
      type: 'url',
      description: 'Link for the affiliate program call to action (e.g., "/affiliate")',
    },
    {
      name: 'affiliateCtaText',
      title: 'Affiliate Call to Action Text',
      type: 'string',
      description: 'Text for the affiliate program call to action button',
    },
  ],
}
