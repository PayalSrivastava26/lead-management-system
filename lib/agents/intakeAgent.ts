export type Lead = {
  name: string;
  email: string;
  message: string;
  source: "facebook" | "google" | "website";
};

export function intakeAgent(data: any): Lead {
  const { name, email, message, source } = data;

  if (!name || name.length < 2) {
    throw new Error("Invalid name");
  }

  if (!email || !email.includes("@")) {
    throw new Error("Invalid email");
  }

  if (!message || message.length < 15) {
    throw new Error("Message must be at least 15 characters");
  }

  if (!["facebook", "google", "website"].includes(source)) {
    throw new Error("Invalid source");
  }

  return {
    name,
    email,
    message,
    source,
  };
}