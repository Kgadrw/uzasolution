// schemas/uzabulkSlider.js

import { Globe, Repeat, TrendingUp, ShieldCheck } from 'lucide-react'; // Icons for reference (optional in Sanity)

export default {
  name: 'uzabulkSlider',
  title: 'Uzabulk Slider',
  type: 'document',
  fields: [
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'offerings',
              title: 'Offerings',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Globe', value: 'Globe' },
                          { title: 'Repeat', value: 'Repeat' },
                          { title: 'TrendingUp', value: 'TrendingUp' },
                          { title: 'ShieldCheck', value: 'ShieldCheck' },
                        ],
                      },
                    },
                    {
                      name: 'title',
                      title: 'Offering Title',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Offering Description',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'url',
            },
            {
              name: 'themeColor',
              title: 'Theme Color',
              type: 'string',
              description: 'Hex color for the theme of this slide (e.g., "#FBAF43")',
            },
          ],
        },
      ],
    },
  ],
};
