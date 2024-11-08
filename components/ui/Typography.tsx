// src/components/ui/Typography.
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import {
  brandonGrotesque,
  butlerRegular,
} from "@/public/fonts/config/config";

type PolymorphicAsProp<E extends ElementType> = {
  as?:
    | E
    | React.ComponentType<Omit<ComponentPropsWithoutRef<E>, "as">>
    | React.FunctionComponent<Omit<ComponentPropsWithoutRef<E>, "as">>;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  Omit<ComponentPropsWithoutRef<E>, "as"> & PolymorphicAsProp<E>
>;

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: `scroll-m-20 text-[39px] tracking-tight  font-caption  ${butlerRegular.className}`,
      h2: `scroll-m-20  pb-2 text-3xl font-normal tracking-tight transition-colors first:mt-0 font-caption  ${brandonGrotesque.className}`,
      h3: `scroll-m-20 text-[19px] font-normal tracking-tight font-caption  ${brandonGrotesque.className}`,
      h4: `scroll-m-20 text-[18px] font-normal tracking-tight font-caption  ${brandonGrotesque.className}`,
      p: `leading-7 [&:not(:first-child)]:mt-6  ${brandonGrotesque.className}`,
      base: `text-base  ${brandonGrotesque.className}`,
      quote: `mt-6 border-l-2 pl-6 italic  ${brandonGrotesque.className}`,
      code: `relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold  ${brandonGrotesque.className}`,
      lead: `text-xl text-muted-foreground  ${brandonGrotesque.className}`,
      large: `text-lg font-normal  ${brandonGrotesque.className}`,
      small: `text-sm font-light leading-none  ${brandonGrotesque.className}`,
      muted: `text-sm text-muted-foreground  ${brandonGrotesque.className}`,
      link: `text-primary font-medium hover:underline  ${brandonGrotesque.className}`,
    },
  },
  defaultVariants: {
    variant: "base",
  },
});
type TypographyCvaProps = VariantProps<typeof typographyVariants>;

const defaultElement = "p";

const defaultElementMapping: Record<
  NonNullable<TypographyCvaProps["variant"]>,
  ElementType
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  quote: "blockquote" as "p",
  code: "code",
  lead: "p",
  large: "p",
  small: "p",
  muted: "p",
  link: "a",
  base: "p",
} as const;


export function Typography<E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  variant,
  ...restProps
}: PolymorphicProps<E> & TypographyCvaProps) {
  const Component: ElementType =
    as ?? defaultElementMapping[variant ?? "base"] ?? defaultElement;

  return (
    <Component
      {...(restProps as ComponentPropsWithoutRef<E>)}
      className={cn(typographyVariants({ variant }), className)}
    >
      {children}
    </Component>
  );
}
