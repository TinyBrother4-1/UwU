export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();

    const response = await context.env.AI.run("@cf/qwen/qwen1.5-14b-chat-awq", {
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