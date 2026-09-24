export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();

    // Updated to a valid, active Qwen model on Cloudflare Workers AI
    const response = await context.env.AI.run("@cf/qwen/qwen3-30b-a3b-fp8", {
      messages: messages,
    });

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
