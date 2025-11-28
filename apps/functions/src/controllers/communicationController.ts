import { Request, Response } from 'express';

export const sendBulkMessage = async (req: Request, res: Response) => {
  const { phoneNumbers, message } = req.body;

  if (!phoneNumbers || !message || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
    res.status(400).send('Missing phoneNumbers or message.');
    return;
  }

  try {
    // In a real application, you would loop through the phone numbers
    // and send the message to each one using a third-party service like Twilio.
    console.log(`Sending message: "${message}" to the following numbers:`);
    phoneNumbers.forEach(number => {
      console.log(number);
    });

    res.status(200).send({ success: true, message: 'Messages sent successfully (mocked).' });

  } catch (error) {
    console.error('Error sending bulk message:', error);
    res.status(500).send('Internal Server Error');
  }
};
