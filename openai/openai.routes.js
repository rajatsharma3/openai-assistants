import express from "express";
import {
  uploadFile,
  createAssistants,
  createThread,
  createMessage,
  runAssistant,
} from "./openai.services.js";
const router = express.Router();

router.get("/uploadfile", uploadFile);
router.get("/createAssistants", createAssistants);
router.get("/createThread", createThread);
router.get("/createMessage", createMessage);
router.get("/runAssistant", runAssistant);

export default router;
