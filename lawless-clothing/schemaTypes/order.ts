import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
      },
      initialValue: 'Pending',
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount (ZAR)',
      type: 'number',
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'product', type: 'reference', to: [{ type: 'product' }] },
            { name: 'quantity', type: 'number' },
            { name: 'size', type: 'string' },
            { name: 'color', type: 'string' },
            { name: 'priceAtPurchase', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: ['WhatsApp (Manual)', 'Paystack (Card/EFT)'],
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
