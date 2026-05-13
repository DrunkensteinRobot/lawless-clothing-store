import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
  token: process.env.SANITY_API_TOKEN,
})
