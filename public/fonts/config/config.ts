import localfont from "next/font/local";
export const butlerRegular = localfont({
  src: [
    {
      path: "../../materials/Ubuntu-B.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../materials/Ubuntu-B.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../materials/Ubuntu-B.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-butler-regular",
});

export const brandonGrotesque = localfont({
  src: [
    {
      path: "../../materials/Ubuntu-R.ttf",
      weight: "400",
    },
  ],
  variable: "--font-ubuntu-regular",
});
