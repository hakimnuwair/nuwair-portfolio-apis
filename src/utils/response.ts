// src/utils/response.ts — Clean response helpers

import { Response } from "express";
import { ApiSuccess, ApiError } from "../types";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200,
): Response<ApiSuccess<T>> =>
  res.status(status).json({ success: true, message, data });

export const sendError = (
  res: Response,
  message: string,
  status = 400,
  errors?: Record<string, string>,
): Response<ApiError> =>
  res.status(status).json({ success: false, message, ...(errors && { errors }) });
