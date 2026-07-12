import { describe, expect, it } from "vitest";
import { parseAuthCredentials, parsePasswordResetEmail, parsePasswordUpdate } from "./authValidation";

describe("auth validation", () => {
  it("accepts valid email credentials", () => {
    const result = parseAuthCredentials({ email: "cook@example.com", password: "password123" });

    expect(result.success).toBe(true);
  });

  it("rejects weak credentials", () => {
    const result = parseAuthCredentials({ email: "not-an-email", password: "short" });

    expect(result.success).toBe(false);
  });

  it("trims password reset email addresses", () => {
    const result = parsePasswordResetEmail(" cook@example.com ");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("cook@example.com");
    }
  });

  it("requires matching passwords when updating a password", () => {
    expect(parsePasswordUpdate({ confirmPassword: "different123", password: "password123" }).success).toBe(false);
    expect(parsePasswordUpdate({ confirmPassword: "password123", password: "password123" }).success).toBe(true);
  });
});
