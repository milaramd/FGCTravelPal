import { createClient } from "@deepgram/sdk";

const listen = async () => {
  const deepgramApiKey = 'd67ef53fd8b00ec95d77022b8a5c35d08c732afc';
  const url = 'https://api.deepgram.com/v1/listen?model=nova&punctuate=true';
  const deepgram = createClient(deepgramApiKey);

  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
    { url },
    {
      model: 'nova-2',
      language: 'ca',
      smart_format: true, 
    },
  );

  if (error) {
    console.error(error);
  } else {
    console.dir(result, { depth: null });
  }
}

listen();
