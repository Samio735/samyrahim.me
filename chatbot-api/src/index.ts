import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { AzureChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { SystemMessage } from '@langchain/core/messages';

interface ChatRequest {
	prompt: string;
	messages?: { role: 'system' | 'user' | 'assistant'; content: string }[];
}

interface PropertyLead {
	type: 'buyer' | 'seller';
	propertyType?: string;
	budget?: string;
	location?: string;
	requirements?: string;
	contactInfo?: string;
}

type Bindings = {
	OPENAI_API_KEY: string;
	[key: string]: unknown;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	'/*',
	cors({
		origin: ['https://samyrahim.me', 'http://localhost:4321'],
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		allowHeaders: ['Content-Type'],
		exposeHeaders: ['Content-Length'],
		maxAge: 600,
		credentials: true,
	})
);

const responseSchemaOutbound = z.object({
	message: z.string().describe('what the assistant says in response to the user'),
	lead: z.union([z.string().describe('description of the property lead info'), z.null().describe('null if no lead information collected')]),
});

const responseSchemaInbound = z.object({
	message: z.string().describe('what the assistant says in response to the user'),
	appointment: z.union([
		z.string().describe('description of the appointment info like time and description'),
		z.null().describe('null if no appointment information collected'),
	]),
});

const systemPrompt = `You are an AI assistant for Bright Smile Dental Clinic.
Your goal is to help patients with their dental needs and schedule appointments.
About the clinic:
- Location: 123 Health Avenue, Dubai
- Hours: 8 AM to 8 PM, Monday-Saturday (Closed Sundays)
- Services: Regular check-ups, Emergency care, Cosmetic dentistry, Orthodontics, Root canals, Dental implants
Don't talk about anything unrelated to the clinic or dentistry.
Keep responses professional and concise.`.trim();

const realEstateSystemPrompt = `You are Alex, a professional property sales consultant in Dubai.
Your goal is to qualify leads and generate sales opportunities.
Key responsibilities:
- Identify if they're buying or selling
- Understand their property requirements and budget
- Highlight the benefits of working with our agency
- Collect their requirements for follow-up
- Build rapport and create urgency without being pushy
Don't talk about anything unrelated to real estate.

After qualifying the lead, assure them that you'll personally help them find the perfect property match or get the best value for their sale.

Example lead descriptions:
- "Qualified buyer seeking 2BR apartment in Downtown Dubai, budget 1.5M AED, looking to move within 3 months"
- "Hot seller lead: 3BR villa in Arabian Ranches, motivated to sell, property valued around 4M AED"

Keep responses professional but friendly, showing expertise in Dubai's property market.`.trim();

app.post('/inbound', async (c) => {
	const body = await c.req.json<ChatRequest>();
	console.log('Incoming request:', {
		prompt: body.prompt,
		messageCount: body.messages?.length ?? 0,
	});

	try {
		const model = new AzureChatOpenAI({
			temperature: 0,
			azureOpenAIApiKey: c.env.AZURE_OPENAI_API_KEY as string,
			azureOpenAIApiInstanceName: c.env.AZURE_OPENAIA_API_INSTANCE_NAME as string,
			azureOpenAIApiDeploymentName: c.env.AZURE_OPENAIA_API_DEPLOYMENT_NAME as string,
			azureOpenAIApiVersion: c.env.AZURE_OPENAI_API_VERSION as string,
		});

		const chain = model.withStructuredOutput(responseSchemaInbound);
		const response = await chain.invoke([
			{
				role: 'system',
				content: systemPrompt,
			},
			...(body.messages ?? []),
			{
				role: 'user',
				content: body.prompt,
			},
		]);

		console.log('Response:', response);

		return c.json({ response });
	} catch (error) {
		console.error('Error processing request:', error);
		return c.json(
			{
				response: {
					message: "I'm having technical difficulties right now. Please try your question again.",
					lead: null,
				},
			},
			500
		);
	}
});

app.post('/outbound', async (c) => {
	const body = await c.req.json<ChatRequest>();
	console.log('Incoming real estate request:', {
		prompt: body.prompt,
		messageCount: body.messages?.length ?? 0,
	});

	try {
		const model = new AzureChatOpenAI({
			temperature: 0.7, // slightly more conversational
			azureOpenAIApiKey: c.env.AZURE_OPENAI_API_KEY as string,
			azureOpenAIApiInstanceName: c.env.AZURE_OPENAIA_API_INSTANCE_NAME as string,
			azureOpenAIApiDeploymentName: c.env.AZURE_OPENAIA_API_DEPLOYMENT_NAME as string,
			azureOpenAIApiVersion: c.env.AZURE_OPENAI_API_VERSION as string,
		});

		const chain = model.withStructuredOutput(responseSchemaOutbound);
		const response = await chain.invoke([
			{
				role: 'system',
				content: realEstateSystemPrompt,
			},
			...(body.messages ?? []),
			{
				role: 'user',
				content: body.prompt,
			},
		]);

		console.log('Real Estate Response:', response);
		return c.json({ response });
	} catch (error) {
		console.error('Error processing real estate request:', error);
		return c.json(
			{
				response: {
					message: "I'm having technical difficulties right now. Please try your question again.",
					lead: null,
				},
			},
			500
		);
	}
});

export default app;
