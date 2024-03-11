import { z } from "zod";

import { ZColor } from "./common";

export const ZStylingColor = z.object({
  light: ZColor,
  dark: ZColor.nullish(),
});
export type TStylingColor = z.infer<typeof ZStylingColor>;

export const ZCardArrangementOptions = z.enum(["casual", "straight", "simple"]);
export type TCardArrangementOptions = z.infer<typeof ZCardArrangementOptions>;

export const ZCardArrangement = z.object({
  linkSurveys: ZCardArrangementOptions,
  inAppSurveys: ZCardArrangementOptions,
});

export const ZBaseStyling = z.object({
  brandColor: ZStylingColor.nullish(),
  questionColor: ZStylingColor.nullish(),
  inputColor: ZStylingColor.nullish(),
  inputBorderColor: ZStylingColor.nullish(),
  cardBackgroundColor: ZStylingColor.nullish(),
  highlightBorderColor: ZStylingColor.nullish(),
  isDarkModeEnabled: z.boolean().nullish(),
  roundness: z.number().nullish(),
  cardArrangement: ZCardArrangement.nullish(),
});