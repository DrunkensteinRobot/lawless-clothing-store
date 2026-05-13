import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'Max 2 lines for the product cards.',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'details',
      title: 'Product Details',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price (ZAR)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes Available',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Small', value: 'S'},
          {title: 'Medium', value: 'M'},
          {title: 'Large', value: 'L'},
          {title: 'X-Large', value: 'XL'},
          {title: 'XX-Large', value: 'XXL'},
        ],
      },
    }),
    defineField({
      name: 'colors',
      title: 'Colors Available',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Enter color names (e.g. Black, White, Red)',
    }),
    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      description: 'Used for "Only X left" urgency warnings.',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'isNewArrival',
      title: 'New Arrival',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBestSeller',
      title: 'Best Seller',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'relatedDrop',
      title: 'Related Drop',
      type: 'reference',
      to: [{type: 'drop'}],
      description: 'Is this product part of a limited drop?',
    }),
  ],
})
