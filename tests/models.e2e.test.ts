import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'
import { config } from '../src/config.ts'
import { type LLMResponse, OpenRouterService } from '../src/openRouterService.ts'

console.assert(
    process.env.OPENROUTER_API_KEY_FREE,
    'OPENROUTER_API_KEY_FREE is not set in env variables'
)

// NLM_MODELS_FREE
test('model nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free works', async () => {
    const customConfig ={
        ...config,
        models: ['nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free')
});

test.skip('model recursive/flint-v1.0:free works', async () => {
    const customConfig ={
        ...config,
        models: ['recursive/flint-v1.0:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'recursive/flint-v1.0:free')
});

test.skip('model thinkingmachines/inkling-small:free works', async () => {
    const customConfig ={
        ...config,
        models: ['thinkingmachines/inkling-small:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'thinkingmachines/inkling-small:free')
});

test.skip('model thinkingmachines/inkling:free works', async () => {
    const customConfig ={
        ...config,
        models: ['thinkingmachines/inkling:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'thinkingmachines/inkling:free')
});

test('model dots-studio/dots-3-note-preview:free works', async () => {
    const customConfig ={
        ...config,
        models: ['dots-studio/dots-3-note-preview:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'dots-studio/dots-3-note-preview:free')
});

test('model nvidia/nemotron-3.5-super-vl:free works', async () => {
    const customConfig ={
        ...config,
        models: ['nvidia/nemotron-3.5-super-vl:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'nvidia/nemotron-3.5-super-vl:free')
});

test('model nvidia/nemotron-3-ultra-550b-a55b:free works', async () => {
    const customConfig ={
        ...config,
        models: ['nvidia/nemotron-3-ultra-550b-a55b:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'nvidia/nemotron-3-ultra-550b-a55b:free')
});

test.skip('model google/gemma-4-31b-it:free works', async () => {
    const customConfig ={
        ...config,
        models: ['google/gemma-4-31b-it:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
});

test.skip('model google/gemma-4-26b-a4b-it:free works', async () => {
    const customConfig ={
        ...config,
        models: ['google/gemma-4-26b-a4b-it:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
});

test.skip('model nvidia/nemotron-3.5-content-safety:free works', async () => {
    const customConfig ={
        ...config,
        models: ['nvidia/nemotron-3.5-content-safety:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
});

test.skip('model liquid/lfm-2.5-2.6b:free works', async () => {
    const customConfig ={
        ...config,
        models: ['liquid/lfm-2.5-2.6b:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
});

test('model xingchen-agi/xing4.0-29b-a4b:free works', async () => {
    const customConfig ={
        ...config,
        models: ['xingchen-agi/xing4.0-29b-a4b:free'],
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }
    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question:'What is rate limiting?'}
    })
    assert.equal(response.statusCode, 200)
});
