console.assert(
    process.env.OPENROUTER_API_KEY_FREE, 
    'API Key is not set in .env file'
);

export type ModelConfig = {
    apiKey: string;
    httpRefer: string;
    xTitle: string;
    port: number;
    models: string[];
    temperature: number;
    maxTokens: number;
    systemPrompt: string;

    provider: {
        sort: {
            by: string;
            partition: string;
        }
    }
};

export const config: ModelConfig = {
    apiKey: process.env.OPENROUTER_API_KEY_FREE!,
    httpRefer: 'http://pos-ia.com',
    xTitle: 'SmartModelRouterGateway',
    port: 3000,
    models: [
        'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
        'dots-studio/dots-3-note-preview:free',
        'liquid/lfm-2.5-2.6b:free'
    ],
    temperature: 0.2,
    maxTokens: 100,
    systemPrompt: 'You are a helpful assistant that provides accurate and concise responses',
    provider: {
        sort: {
            by: 'latency',
            // by: 'price',
            // by: 'troughput',
            // by: 'rank',
            
            
            partition: 'none'
        }
    }
}