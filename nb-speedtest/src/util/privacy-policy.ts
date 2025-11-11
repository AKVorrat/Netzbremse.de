const PRIVACY_POLICY_VERSION = "2025-11-11";
const STORAGE_KEY = "netzbremse_cloudflare_privacy_policy_accepted";

export interface PrivacyPolicyAcceptance {
  version: string;
  timestamp: number;
}

export function getPrivacyPolicyVersion(): string {
  return PRIVACY_POLICY_VERSION;
}

export function isPrivacyPolicyAccepted(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return false;
    }

    const acceptance: PrivacyPolicyAcceptance = JSON.parse(stored);
    return acceptance.version === PRIVACY_POLICY_VERSION;
  } catch {
    return false;
  }
}

export function acceptPrivacyPolicy(): void {
  const acceptance: PrivacyPolicyAcceptance = {
    version: PRIVACY_POLICY_VERSION,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(acceptance));
  } catch (error) {
    console.error("Failed to store privacy policy acceptance:", error);
  }
}

export function clearPrivacyPolicyAcceptance(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear privacy policy acceptance:", error);
  }
}
