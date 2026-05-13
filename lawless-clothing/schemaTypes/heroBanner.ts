import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline Overlay',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub-Message',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Background Image/Video',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'collection',
      title: 'Featured Collection',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'string',
      description: 'E.g., /collections/summer-drop',
    }),
  ],
})
