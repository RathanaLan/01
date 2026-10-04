const https = require('https');

const SUPABASE_URL = "https://dgehlxhbggqxiznsryrv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0r0SqqjiXg8KGQVqQZM0TQ_KuCheFqj";

console.log("Testing live connection to Supabase endpoint:", SUPABASE_URL);

const options = {
  hostname: "dgehlxhbggqxiznsryrv.supabase.co",
  port: 443,
  path: "/rest/v1/",
  method: "GET",
  headers: {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
  }
};

const req = https.request(options, (res) => {
  console.log(`Supabase REST Endpoint HTTP Status: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("Endpoint response successfully received. Supabase API is online!");
  });
});

req.on('error', (e) => {
  console.error("Connection error:", e.message);
});

req.end();
