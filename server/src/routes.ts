import express from "express";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedback-repository";
import { SubmitFeedbackUseCase } from "./useCases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const primaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    primaFeedbacksRepository,
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
