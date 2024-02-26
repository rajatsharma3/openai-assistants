import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

export const uploadFile = async (req, res) => {
  try {
    const file = await openai.files.create({
      file: fs.createReadStream("openai/drapcodeintro.pdf"),
      purpose: "assistants",
    });

    console.log(file);
    res.send(file);
  } catch (err) {
    res.send(err);
  }
};

export const createAssistants = async (req, res) => {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "Drapcode Assistant",
      instructions:
        "You are a drapcode website assistant.try to provide every answer in professional way",
      tools: [{ type: "retrieval" }],
      model: "gpt-4-turbo-preview",
      file_ids: ["file-2JR2J6V3JEBqyiUxFg2ngIYK"],
    });

    res.send(assistant);
  } catch (err) {
    res.send(err);
  }
};

export const createThread = async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    res.send(thread);
  } catch (err) {
    res.send(err);
  }
};

export const createMessage = async (req, res) => {
  try {
    const thread = req.body;
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "what is the distance between earth and sun",
    });
    res.send(message);
  } catch (err) {
    res.send(err);
  }
};

export const runAssistant = async (req, res) => {
  try {
    const thread_id = req.body.thread_id;
    const assistant_id = req.body.assistant_id;
    console.log("thread_id", thread_id);
    console.log("assistant_id", assistant_id);
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: assistant_id,
      instructions:
        "Please address the user as Rajat. The user has a premium account.",
    });

    const messages = await openai.beta.threads.messages.list(thread_id);
    console.log(messages.body);
    res.send(messages.body);
  } catch (err) {
    res.send(err);
  }
};
