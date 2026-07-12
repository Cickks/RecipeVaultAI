import { describe, expect, it } from "vitest";
import { parseAuthDeepLink } from "./authDeepLink";

describe("parseAuthDeepLink", () => {
  it("parses implicit-flow tokens from a URL fragment", () => {
    const result = parseAuthDeepLink(
      "recipevaultai://auth/recovery#access_token=access-123&refresh_token=refresh-456&type=recovery",
    );

    expect(result).toMatchObject({
      accessToken: "access-123",
      code: null,
      errorDescription: null,
      refreshToken: "refresh-456",
    });
  });

  it("parses a PKCE authorization code", () => {
    const result = parseAuthDeepLink("recipevaultai://auth/callback?code=code-123");

    expect(result.code).toBe("code-123");
  });

  it("decodes provider errors without throwing", () => {
    const result = parseAuthDeepLink(
      "recipevaultai://auth/callback?error=access_denied&error_description=Link%20expired",
    );

    expect(result.errorDescription).toBe("Link expired");
  });
});
