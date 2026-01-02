
import { GoogleGenAI, Type } from "@google/genai";
import { WorkOrderData } from "../types";

export const parseWorkOrderEmail = async (emailText: string): Promise<WorkOrderData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract work order information from the following email text and return it as JSON.
    
    Email Content:
    ${emailText}
    
    Fields to extract:
    - workOrderNumber (look for # or Work Order ID)
    - locationName (the facility name)
    - locationId (often a short code like CC234)
    - address (street address)
    - cityStateZip (City, State, and Zip code)
    - problemDescription (The full description of what needs to be fixed)
    - ivrCheckInLine (The phone number for automated check-in)
    - accountCodePin (The PIN or account code provided)
    - dsTrackingNumber (Often same as Work Order number)
    - customerName (The client company name)`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          workOrderNumber: { type: Type.STRING },
          locationName: { type: Type.STRING },
          locationId: { type: Type.STRING },
          address: { type: Type.STRING },
          cityStateZip: { type: Type.STRING },
          problemDescription: { type: Type.STRING },
          ivrCheckInLine: { type: Type.STRING },
          accountCodePin: { type: Type.STRING },
          dsTrackingNumber: { type: Type.STRING },
          customerName: { type: Type.STRING },
        },
        required: ["workOrderNumber", "problemDescription"]
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Failed to parse email content");
  
  return JSON.parse(text) as WorkOrderData;
};
