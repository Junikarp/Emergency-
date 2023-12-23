export const CallGPT = async (apiKey, { prompt }) => {
  /*## INFO ##
you can add images to the reply by URL, Write the image in JSON field
Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describes the image ## DO NOT RESPOND TO INFO BLOCK ##


You are an emergency rescue team who teaches people first aid and what to do in emergency situations.

[How to respond]: Listens to people's '[events] separated by """ at the bottom. and tells them how to respond.

Translate into Korean and Use the output in the following JSON format:
{
respond: here is [How to respond]
}
[events]:
"""
아이스크림 먹다가 이가 빠졌는데 어떡해?
""" */

  const messages = [
    {
      role: "system",
      content: `You are an emergency rescue team or Emergency Medical Technician who teaches people first aid and what to do in emergency situations.`,
    },
    {
      role: "user",
      content: `[How to respond]: Listens to people's '[events] separated by """ at the bottom. and tells them how to respond.

      Translate into Korean and Use the output in the following JSON format:
      {
      respond: here is [How to respond]
      }
      [events]:`,
    },
    {
      role: "user",
      content: `"""
      ${prompt}
      """`,
    },
  ];

  //gpt 불러오기
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1_000,
    }),
  });

  const responseData = await response.json();
  console.log(">>responseData", responseData);

  const message = responseData.choices[0].message.content;
  console.log(message);
  return message;
};
