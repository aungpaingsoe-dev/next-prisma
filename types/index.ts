import { ZodIssue } from "zod";

export interface Response {
  success: boolean;
  data?: any;
  error?: string;
  details?: ZodIssue[]
}
