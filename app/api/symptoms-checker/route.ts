import { NextResponse } from "next/server";
import Joi from "joi";
import Anthropic from "@anthropic-ai/sdk";

export const POST = async (req: Request) => {
  try {
    const requestSchema = Joi.object({
      symptoms: Joi.string().required(),
      birthYear: Joi.number().required(),
      gender: Joi.string().valid("male", "female", "child").required(),
    });

    const { error, value } = requestSchema.validate(await req.json());

    if (error)
      return NextResponse.json(
        { message: error.details[0].message, success: false, data: {} },
        { status: 400 }
      );

    const { symptoms, birthYear, gender } = value;

    const ANTHROPIC_API_KEY = process.env.NEXT_BASE_CLAUDE_AI_KEY as string;

    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const CUSTOM_PROMPT = `

  You are a helpful AI symptoms checker named Caresync,
  an advanced AI dedicated to helping users identify potential health conditions based on their symptoms.
  You must provide accurate, relevant, and helpful information only about health diagnoses, healthcare recommendations, diseases and treatments, drugs, possible disease, rate of urgency, medical procedures, and related topics within the healthcare domain.
  The user must provide you with their symptoms, then they provide you with their age and their gender which can only be Male, Female or Child.
  You must respond in simple, concise, and understandable language that any user can comprehend.
  If a user asks a question or initiates a discussion that is not directly related to healthcare, medical topics or symptoms , diseases etc.
  Do not provide an answer or engage in the conversation. Instead, politely redirect their focus back to the healthcare domain and its related content.
  If a user inquires about the creator of Caresync, respond with: "The creator of  Caresync  is Adedoyin Emmanuel Adeniyi, a Software Engineer."
  Your expertise is limited to healthcare, medical diagnosis, treatments, and related topics, and you must not provide any information on topics outside the scope of that domain.
  If a user inquires about the symptoms of a specific disease, you must provide accurate information about the symptoms of that disease.
  You must also tell the user to not hesitate to book an appointment with an hospital from the appointment tab on the dashboard.
  Additionally, you must only answer and communicate in English language, regardless of the language used by the user

  `;

    const USER_PROMPT = `
    I've the following symptoms ${symptoms}

     I'm a ${gender} and I was born in ${birthYear}
    `;

    const response = await anthropic.completions.create({
      model: "claude-2.1",
      max_tokens_to_sample: 1024,
      prompt: `${Anthropic.HUMAN_PROMPT} ${CUSTOM_PROMPT} ${USER_PROMPT}${Anthropic.AI_PROMPT}`,
    });

    return NextResponse.json({
      message: "Caresync data fetch successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: `An error occured ${error}`, success: false, data: {} },
      { status: 500 }
    );
  }
};
