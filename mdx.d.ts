declare module "*.mdx" {
  import type { ComponentType } from "react";
  const component: ComponentType<any>;
  export default component;
  export const metadata: {
    title: string;
    date: string;
    category: string;
  };
}
