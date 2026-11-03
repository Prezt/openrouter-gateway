import { OpenRouter } from '@openrouter/sdk';
import { config, type ModelConfig } from './config.ts';
import { type ChatGenerationParams } from '@openrouter/sdk/models';

export type LLMResponse = {
    model: string;
    content: string;
};  

export class OpenRouterService {
    private client: OpenRouter;
    private config: ModelConfig;
    constructor(configOverride: ModelConfig){
        this.config = {...config, ...configOverride};
        
        this.client = new OpenRouter({
            apiKey: this.config.apiKey,
            httpReferer: this.config.httpRefer,
            xTitle: this.config.xTitle,
        });
    }

    async generate(prompt: string): Promise<LLMResponse> {
        try{
            const response = await this.client.chat.send({
                models: this.config.models,
                messages: [
                    { role: 'system', content: this.config.systemPrompt },
                    { role: 'user', content: prompt },
                ],
                stream: false,
                temperature: this.config.temperature,
                maxTokens: this.config.maxTokens,
                provider: this.config.provider as ChatGenerationParams['provider'],
            });

            const content = String(response.choices.at(0)?.message?.content) ?? '';
            // console.log('OpenRouter content:', content);
            return {
                model: response.model,
                content
            };
        } catch (error) {
            console.error('Error generating response from OpenRouter with model', this.config.models[0], (error as Error).message);
            throw new Error('Failed to generate response from OpenRouter');
        }
    }
}


// const client = new OpenRouter({
//   apiKey: '<OPENROUTER_API_KEY>',
//   httpReferer: '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
//   appTitle: '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
// });

// const response = await client.responses.send({
//   responsesRequest: {
//     model: '~openai/gpt-sol-latest',
//     input: 'What is the meaning of life?',
//   },
// });

// if (!('output' in response)) {
//   throw new Error('Expected a non-streaming response');
// }
// if (response.status !== 'completed') {
//   throw new Error(response.error?.message ?? `Response ended as ${response.status}`);
// }

// const message = response.output.find((item) => item.type === 'message');
// console.log(message?.content.find((part) => part.type === 'output_text')?.text);