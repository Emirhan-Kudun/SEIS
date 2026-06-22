# Provider Interface

Provider-agnostic contract for the SEIS model router. Concrete adapters
(OpenAI, Anthropic, Gemini, Qwen, Ollama, future SEIS-local) implement this
shape. The interface is original and does not mirror any provider's private API.

## Shape (illustrative)

```ts
interface ProviderResult {
  text: string;
  finishReason: "stop" | "length" | "tool" | "error";
  // Safe metadata only — never raw prompts or secrets.
  meta: { provider: string; profile: string; latencyMs: number };
}

interface ModelProvider {
  id: string;                       // e.g. "openai", "anthropic", "ollama"
  // Credentials come ONLY from process.env / runtime config, never arguments.
  isAvailable(): boolean;           // reflects env presence + health
  run(task: RoutedTask): Promise<ProviderResult>;
}
```

## Rules

- Credentials are read from environment variables (e.g. `OPENAI_API_KEY`),
  never passed through code, manifests, prompts, or logs.
- An unavailable provider returns `isAvailable() === false`; the router falls
  back per [routing policy](./routing-policy.md).
- Adapters expose only generic, public concepts. No private endpoint names,
  hidden parameters, or copied behaviour.
