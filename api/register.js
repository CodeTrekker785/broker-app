import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  const { username, password } = req.body;

  const { data: exists } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

  if (exists) return res.json({ error: "User exists" });

  await supabase.from("users").insert({
    username,
    password,
    balance: 0,
    profit: 0
  });

  res.json({ success: true });
}