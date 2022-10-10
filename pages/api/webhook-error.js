const { createClient } = require('@supabase/supabase-js');

const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const sbKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const sb = createClient(sbUrl, sbKey);

export default async function handler(req, res) {
  const { headers, body } = req;
  const { transfer, state, coin } = body;

  await sb.from('bitgo_webhook').insert([
    {
      transaction_id: transfer,
      status: state,
      coin,
      header: headers,
      body,
      res_status: 500,
    },
  ]);

  return res.status(500).json({ message: 'Internal Server Error!' });
}