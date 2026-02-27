"use client";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fincha.tewostechsolutions.com/api/v1").replace(/\/$/, "");

export async function submitTenderApplication(tenderId: number | string, formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/tenders/${tenderId}/apply`, {
    method: "POST",
    body: formData,
  });

  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const error = new Error("Failed to submit tender application");
    (error as { data?: unknown }).data = data;
    throw error;
  }

  return data;
}
