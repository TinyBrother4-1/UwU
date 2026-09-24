export async function onRequestPost(context) {
  try {
    const { messages, model } = await context.request.json();

    // Use the model requested by the frontend, or fall back to a default
    const selectedModel = model || "@cf/qwen/qwen3-30b-a3b-fp8";

    const response = await context.env.AI.run(selectedModel, {
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
