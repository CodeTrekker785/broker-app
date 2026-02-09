import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  const { username, amount } = req.body;

  const { data: user } = await supabase
    .from("users")
    .select("balance")
    .eq("username", username)
    .single();

  if (user.balance < amount)
    return res.json({ error: "Insufficient balance" });

  await supabase.from("users")
    .update({ balance: user.balance - amount })
    .eq("username", username);

  await supabase.from("trades").insert({
    username,
    amount,
    status: "open"
  });

  res.json({ success: true });
}