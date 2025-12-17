import type { APIRoute } from 'astro';
import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from '@aws-sdk/client-bedrock-agent-runtime';
import { fromSSO } from '@aws-sdk/credential-providers';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const userMessage = body.message;

    if (!userMessage) {
      return new Response(
        JSON.stringify({ error: 'El mensaje es requerido' }),
        { status: 400 }
      );
    }

    // Configuración desde variables de entorno
    const region = import.meta.env.AWS_REGION || 'us-east-1';
    const knowledgeBaseId = import.meta.env.KNOWLEDGE_BASE_ID;
    const guardrailId = import.meta.env.GUARDRAIL_ID;
    const guardrailVersion = import.meta.env.GUARDRAIL_VERSION || '1';
    const modelArn = import.meta.env.MODEL_ARN;

    console.log('🔧 Config:', { region, knowledgeBaseId, guardrailId, modelArn });

    if (!knowledgeBaseId || !guardrailId) {
      return new Response(
        JSON.stringify({ error: 'Configuración de AWS Bedrock incompleta' }),
        { status: 500 }
      );
    }

    // Crear cliente con credenciales SSO
    const client = new BedrockAgentRuntimeClient({ 
      region: region,
      credentials: fromSSO({ profile: 'gva-academy' })
    });

    // retrieve_and_generate con Knowledge Base y Guardrail
    const command = new RetrieveAndGenerateCommand({
      input: {
        text: userMessage
      },
      retrieveAndGenerateConfiguration: {
        type: 'KNOWLEDGE_BASE',
        knowledgeBaseConfiguration: {
          knowledgeBaseId: knowledgeBaseId,
          modelArn: modelArn,
          generationConfiguration: {
            guardrailConfiguration: {
              guardrailId: guardrailId,
              guardrailVersion: 'DRAFT'
            }
          }
        }
      }
    });

    console.log('📤 Enviando comando a Bedrock...');
    const response = await client.send(command);
    console.log('✅ Respuesta recibida');
    
    const assistantMessage = response.output?.text || 'Lo siento, no pude generar una respuesta.';

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('❌ Error en /api/chat:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error al conectar con AWS Bedrock',
        details: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
