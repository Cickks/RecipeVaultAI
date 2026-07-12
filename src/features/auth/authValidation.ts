import { z } from "zod";

const emailSchema = z.string().trim().email("Enter a valid email address.");

const authCredentialsSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const passwordUpdateSchema = z
  .object({
    confirmPassword: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type AuthCredentials = z.infer<typeof authCredentialsSchema>;

export function parseAuthCredentials(input: AuthCredentials) {
  return authCredentialsSchema.safeParse(input);
}

export function parsePasswordResetEmail(email: string) {
  return emailSchema.safeParse(email);
}

export function parsePasswordUpdate(input: { confirmPassword: string; password: string }) {
  return passwordUpdateSchema.safeParse(input);
}
