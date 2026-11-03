import { createServer } from './server.ts';
import { config, type ModelConfig } from './config.ts';
import { OpenRouterService } from './openRouterService.ts';

const openRouterService = new OpenRouterService(config);
const app = createServer(openRouterService);

await app.listen({ port: 3000, host: '0.0.0.0'})
app.log.info('Server running on http://0.0.0.0:3000')

app.inject({
    "method": "POST",
    "url": "/chat",
    "body": {
        "question": "hello world"
    }
}).then((response) => {
    console.log('Response Status', response.statusCode);
    console.log('Response body', response.body);
}).catch((error) => {
    console.error('Error during /chat request:', error);
})