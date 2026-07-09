import { ReactNode } from "react";
import { StyleSheet, Text as RNText, TextProps } from "react-native";
import { colors } from "@/theme/tokens";

type Props = TextProps & {
  children: ReactNode;
  variant?: "title" | "heading" | "body" | "caption" | "label";
};

export function Text({ children, variant = "body", style, ...props }: Props) {
  return (
    <RNText style={[styles.base, styles[variant], style]} {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.ink,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0,
  },
  heading: {
    fontSize: 22,
    fontWeight: "800",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    color: colors.cocoa,
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    color: colors.cocoa,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
