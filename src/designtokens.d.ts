declare module "designtokens.json" {
  export interface ButtonStateColors {
    text: string;
    "background-normal": string;
    "background-hover": string;
    "background-active": string;
    "background-disabled": string;
  }

  export interface ButtonsColors {
    subtle: ButtonStateColors;
    default: ButtonStateColors;
    primary: ButtonStateColors;
    warning: ButtonStateColors;
    danger: ButtonStateColors;
  }

  export interface Tokens {
    colors: {
      buttons: ButtonsColors;
    };
  }

  const value: Tokens;
  export default value;
}
