import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

import type { ComponentProps } from "react";
import clsx from "clsx";
import { Codeblock } from "./code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, ...props }: ComponentProps<"h1">) => (
      <h1 className="scroll-m-20 text-4xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentProps<"h2">) => (
      <h2
        className="mt-10 scroll-m-20 border-b border-b-zinc-200 pb-2 text-3xl transition-colors first:mt-0 dark:border-b-zinc-700"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentProps<"h3">) => (
      <h3 className="mt-8 scroll-m-20 text-2xl text-stone-200" {...props}>
        {children}
      </h3>
    ),
    p: ({ className, children, ...props }: ComponentProps<"p">) => (
      <p
        className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      >
        {children}
      </p>
    ),
    a: (props: ComponentProps<"a">) => {
      const isExternal = Boolean(props.href?.startsWith("http"));
      const Component = isExternal ? "a" : Link;

      return (
        <Component
          href={props.href ?? "#"}
          className="decoration-accent-500 underline decoration-2 underline-offset-4"
        >
          {props.children}
        </Component>
      );
    },
    ul: ({ children, ...props }: ComponentProps<"ul">) => (
      <ul className="mt-4 list-disc pl-8" {...props}>
        {children}
      </ul>
    ),
    code: ({ children, ...props }: ComponentProps<"code">) => (
      <code
        className="relative rounded bg-stone-200 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-zinc-900 dark:bg-stone-700 dark:text-stone-200"
        {...props}
      >
        {children}
      </code>
    ),
    pre: Codeblock,
    img: ({ src, alt }) => <Image src={src ?? ""} alt={alt ?? ""} />,

    ...components,
  };
}
