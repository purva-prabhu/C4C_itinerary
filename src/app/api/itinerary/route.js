import { OpenAI } from 'openai';
import mockData from './data.json';

const openai = new OpenAI({
  apiKey: 'process.env.OPENAI_API_KEY, // Ensure you have your API key set in .env.local'
});

const mockFlag = true;

export async function POST(request) {
  const { city, dates } = await request.json();

  if (mockFlag) {
    try {
      return new Response(JSON.stringify(mockData.itineraryMarkdown), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Mock Data Error:', error.message);
      return new Response(JSON.stringify({ error: `Failed to fetch mock itinerary: ${error.message}` }), {
        status: 500,
      });
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Create a detailed itinerary for a trip to ${city} from ${dates[0].format('MMMM Do YYYY')} to ${dates[1].format('MMMM Do YYYY')}.`,
        },
      ],
    });

    return new Response(JSON.stringify(response.choices[0].message.content), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch itinerary from OpenAI' }), {
      status: 500,
    });
  }
}
