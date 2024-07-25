import { Colors } from "@/types/enums";

export const getCoefficentColor = (coefficient: number) =>
  coefficient <= 2
    ? Colors["low"]
    : coefficient >= 10
    ? Colors["large"]
    : Colors["medium"];
