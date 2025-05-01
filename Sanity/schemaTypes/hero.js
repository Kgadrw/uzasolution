// schemas/hero.js

export default {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
      {
        name: 'heroTitle',
        title: 'Hero Title',
        type: 'string',
        description: 'The title displayed in the hero section',
      },
      {
        name: 'heroSubtitle',
        title: 'Hero Subtitle',
        type: 'string',
        description: 'The subtitle displayed in the hero section',
      },
      {
        name: 'heroDescription',
        title: 'Hero Description',
        type: 'text',
        description: 'A description of the hero section, displayed below the title',
      },
      {
        name: 'primaryCtaText',
        title: 'Primary CTA Text',
        type: 'string',
        description: 'Text for the main call to action button',
      },
      {
        name: 'primaryCtaLink',
        title: 'Primary CTA Link',
        type: 'url',
        description: 'The URL for the main call to action button',
      },
      {
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        description: 'The background image of the hero section on desktop',
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: {
          hotspot: true,
        },
        description: 'The logo displayed in the navbar',
      },
      {
        name: 'signInLink',
        title: 'Sign In Link',
        type: 'url',
        description: 'The link to the sign-in page',
      },
    ],
  }
  