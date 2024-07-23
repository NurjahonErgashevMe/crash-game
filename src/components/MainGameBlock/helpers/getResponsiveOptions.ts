import { Props as CountProps } from "use-count-up";

type Options = {
  small: CountProps;
  medium: CountProps;
  big: CountProps;
};

export const getResponsiveOptions = (width: number) => {
  return ({ small, medium, big }: Options) => {
    if (width <= 922) {
      return small;
    }

    if (width >= 1400) {
      return big;
    }

    return medium;
  };
};
