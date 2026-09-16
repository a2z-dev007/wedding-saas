import React from "react";
import NoorNikah, { defaultData as noorNikahData } from "./noor-e-nikah";
import RoyalLotus, { defaultData as royalLotusData } from "./royal-lotus";
import CrimsonRoyale, { defaultData as crimsonRoyaleData } from "./crimson-royale";
import EmeraldNoir, { defaultData as emeraldNoirData } from "./emerald-noir";
import RoyalElegance, { defaultData as royalEleganceData } from "./royal-elegance";
import ModernMinimal, { defaultData as modernMinimalData } from "./modern-minimal";

export {
  NoorNikah,
  RoyalLotus,
  CrimsonRoyale,
  EmeraldNoir,
  RoyalElegance,
  ModernMinimal,
  noorNikahData,
  royalLotusData,
  crimsonRoyaleData,
  emeraldNoirData,
  royalEleganceData,
  modernMinimalData,
};

export const TEMPLATES_MAP: Record<string, React.ComponentType<{ data?: any }>> = {
  "noor-e-nikah": NoorNikah,
  "royal-lotus": RoyalLotus,
  "crimson-royale": CrimsonRoyale,
  "emerald-noir": EmeraldNoir,
  "royal-elegance": RoyalElegance,
  "modern-minimal": ModernMinimal,
};

export const TEMPLATE_DEFAULT_DATA: Record<string, any> = {
  "noor-e-nikah": noorNikahData,
  "royal-lotus": royalLotusData,
  "crimson-royale": crimsonRoyaleData,
  "emerald-noir": emeraldNoirData,
  "royal-elegance": royalEleganceData,
  "modern-minimal": modernMinimalData,
};

export function getTemplateComponent(templateId: string): React.ComponentType<{ data?: any }> {
  return TEMPLATES_MAP[templateId] || NoorNikah;
}

export function getTemplateDefaultData(templateId: string): any {
  return TEMPLATE_DEFAULT_DATA[templateId] || noorNikahData;
}
