import { z } from "zod";

export const createReportSchema = (t) => {
  return z
    .object({
      fullName: z
        .string()
        .optional(),

      phone: z
        .string()
        .optional(),

      contactMethod: z
        .string()
        .optional(),

      district: z
        .string()
        .min(1, t("validation.district")),

      safeNow: z
        .string()
        .min(1, t("validation.safeNow")),

      danger: z
        .string()
        .min(1, t("validation.danger")),

      supportNeeded: z
        .array(z.string())
        .optional(),

      description: z
        .string()
        .optional(),
    })
    .superRefine((data, ctx) => {
      // Phone is required when a contact method is selected,
      // except when the user chooses "Do Not Contact Me".
      if (
        data.contactMethod &&
        data.contactMethod !== "Do Not Contact Me" &&
        !data.phone?.trim()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: t("validation.phoneRequired"),
        });
      }

      // If a phone number is provided, validate its format.
      if (data.phone?.trim()) {
        const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

        if (!phoneRegex.test(data.phone.trim())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["phone"],
            message: t("validation.invalidPhone"),
          });
        }
      }
    });
};