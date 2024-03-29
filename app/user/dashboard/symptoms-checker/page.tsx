"use client";
import React, { useState } from "react";
import SidebarLayout from "@/app/components/SidebarLayout";
import Seo from "@/app/components/Seo/Seo";
import Text from "@/app/components/Text";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { LoaderSmall } from "@/app/components/Loader";
import toast from "react-hot-toast";

import Anthropic from "@anthropic-ai/sdk";

const SymptomsChecker = () => {
  const [formData, setFormData] = useState({
    symptoms: "",
    gender: "male",
    birthYear: "",
  });

  const [claudeAIResponse, setClaudeAIResponse] = useState<string>("");
  const [isAIFetchingData, setIsAIFetchingData] = useState<boolean>(false);

  const ANTHROPIC_API_KEY = process.env
    .NEXT_PUBLIC_BASE_CLAUDE_AI_KEY as string;

  const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const handleInputChange = (e: React.FormEvent<HTMLFormElement> | any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmitButtonClick = async () => {
    console.log(formData);
    setIsAIFetchingData(true);

    const { birthYear, gender, symptoms } = formData;

    if (!symptoms || !birthYear || !gender)
      return toast.error("Please fill the necessary fields");

    const USER_PROMPT = `
    I've the following symptoms ${symptoms}

     I'm a ${gender} and I was born in ${birthYear}
    `;

    try {
      const response = await anthropic.completions.create({
        model: "claude-2.1",
        max_tokens_to_sample: 1024,
        prompt: `${CUSTOM_PROMPT} ${USER_PROMPT}`,
      });

      setIsAIFetchingData(false);
      console.log(response);
      setClaudeAIResponse(response.completion);
    } catch (error: any) {
      setIsAIFetchingData(false);
      console.log(error);
      toast.error("Oh sugar! Something went wrong.");
    }
  };

  return (
    <>
      <Seo
        title="Symptoms Checker"
        description="Symptoms checker to help you identify potential health
                    conditions based on your symptoms"
        keywords="symptoms, symptoms checker,  health diagnosis"
      />
      <SidebarLayout>
        <section className="my-5 w-full">
          <h3 className="font-bold text-2xl capitalize text-accent">
            Symptoms checker
          </h3>
          <Text className="text-sm flex items-center gap-x-2">
            Identify potential health conditions based on your symptoms
          </Text>

          <section className="my-5 grid md:grid-cols-2 grid-cols-1 w-full">
            <section className="p-3 w-full border">
              <Text noCapitalize className="flex items-center gap-x-2">
                Enter symptoms
                <span
                  className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full text-[12px]"
                >
                  <span className="text-[12px]">1</span>
                </span>
              </Text>
              <br />
              <Input
                type="text"
                placeholder="Type your symptoms here"
                className=""
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
              />

              <select
                className="select border-2 border-gray-300 focus:outline-none rounded-md w-full my-5 h-16"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="child">Child</option>
              </select>

              <Input
                type="number"
                placeholder="Enter your birth year"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange}
              />

              <section className="mt-4 w-full ">
                <Button onClick={handleSubmitButtonClick}>Submit</Button>
              </section>
            </section>

            <section className="w-full p-3 border">
              <Text noCapitalize className="flex items-center gap-x-2">
                Possible diseases
                <span
                  className="bg-accent  text-center flex items-center justify-center font-bold h-6 w-6
             text-white rounded-full text-[12px]"
                >
                  <span className="text-[12px]">2</span>
                </span>
              </Text>
              <br />

              <section
                className={`w-full ${
                  isAIFetchingData && "flex items-center justify-center"
                }`}
              >
                {isAIFetchingData ? <LoaderSmall /> : claudeAIResponse}
              </section>
            </section>
          </section>
        </section>
      </SidebarLayout>
    </>
  );
};

export default SymptomsChecker;
