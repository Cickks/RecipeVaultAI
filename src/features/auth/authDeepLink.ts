export const AUTH_CALLBACK_URL = "recipevaultai://auth/callback";
export const PASSWORD_RECOVERY_URL = "recipevaultai://auth/recovery";

export type AuthDeepLinkData = {
  accessToken: string | null;
  code: string | null;
  errorDescription: string | null;
  refreshToken: string | null;
};

export function parseAuthDeepLink(url: string): AuthDeepLinkData {
  const [urlWithoutFragment, fragment = ""] = url.split("#", 2);
  const query = urlWithoutFragment.includes("?") ? urlWithoutFragment.split("?", 2)[1] : "";
  const params = new URLSearchParams(query);
  const fragmentParams = new URLSearchParams(fragment);
  const getParam = (name: string) => fragmentParams.get(name) ?? params.get(name);

  return {
    accessToken: getParam("access_token"),
    code: getParam("code"),
    errorDescription: getParam("error_description") ?? getParam("error"),
    refreshToken: getParam("refresh_token"),
  };
}
