// schemas/hero.js

export default {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
      {
        name: 'navLinks',
        title: 'Navigation Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string',
              },
              {
                name: 'url',
                title: 'URL',
                type: 'url',
              },
            ],
          },
        ],
      },
      {
        name: 'heading',
        title: 'Hero Heading',
        type: 'string',
      },
      {
        name: 'subheading',
        title: 'Hero Subheading',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Hero Description',
        type: 'text',
      },
      {
        name: 'ctaText',
        title: 'Call to Action Text',
        type: 'string',
      },
      {
        name: 'ctaLink',
        title: 'Call to Action Link',
        type: 'url',
      },
      {
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        options: {
          hotspot: true, // Allow users to crop the image
        },
      },
      {
        name: 'logoImage',
        title: 'Logo Image',
        type: 'image',
        options: {
          hotspot: true, 
        },
      },
    ],
  }
  