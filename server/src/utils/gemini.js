import axios from "axios";
const ai = async (data) => {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [
            {
              text: "Explain how AI works.",
            },
          ],
        },
      ],
    },
    {
      headers: {
        "x-goog-api-key": "AIzaSyAE-cFE97OyvomvpOyhR82c9XIzIOAaN0c",
      },
    }
  );
  return response.data.candidates[0].content.parts[0].text;
};
export default ai;
