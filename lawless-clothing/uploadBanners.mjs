import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Using the same config as the storefront
const client = createClient({
  projectId: 'f4cwm01a',
  dataset: 'production',
  apiVersion: '2024-05-12',
  useCdn: false,
  token: 'sk21yG2m1T212k2121H1jFfXU212k1H2m1T1jFfXU1jFfXU1H1jFfXU1H', // We need to generate a token or use the existing one if available. Wait, I don't have a token. I'll need to generate one or create it.
});
