const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:3001";

export type AuthCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  role: string;
  status: string;
  emailVerifiedAt?: string | null;
  phoneVerifiedAt?: string | null;
};

export type RegisterCustomerInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginCustomerInput = {
  email: string;
  password: string;
};

export type AuthCustomerResponse = {
  message?: string;
  user: AuthCustomer;
};

async function authRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${AUTH_API_URL}${path}`, {
    ...options,
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    let message = "Authentication request failed.";

    if (result && typeof result === "object" && "message" in result) {
      const serverMessage = result.message;

      if (typeof serverMessage === "string") {
        message = serverMessage;
      } else if (Array.isArray(serverMessage)) {
        message = serverMessage.filter(
          (item): item is string => typeof item === "string",
        ).join(". ");
      }
    }

    throw new Error(message);
  }

  return result as T;
}

export function registerCustomer(input: RegisterCustomerInput) {
  return authRequest<AuthCustomerResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginCustomer(input: LoginCustomerInput) {
  return authRequest<AuthCustomerResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getCurrentCustomer() {
  return authRequest<{ user: AuthCustomer }>("/auth/me");
}

export function logoutCustomer() {
  return authRequest<{ message: string }>("/auth/logout", {
    method: "POST",
  });
}
export async function verifyCustomerEmail(input: {
  email: string;
  code: string;
}): Promise<{ message: string }> {
  return authRequest<{ message: string }>("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
export async function resendCustomerEmailOtp(input: {
  email: string;
}): Promise<{ message: string }> {
  return authRequest<{ message: string }>("/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
