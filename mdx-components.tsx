import type { MDXComponents } from 'mdx/types'
import { Head } from 'next/document'
import { ComponentPropsWithoutRef } from 'react'
type LinkProps = ComponentPropsWithoutRef<'a'>
type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type CodeProps = ComponentPropsWithoutRef<'code'>
type StrongProps = ComponentPropsWithoutRef<'strong'>
type ItalicProps = ComponentPropsWithoutRef<'i'>
 
const components: MDXComponents = {}
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props: LinkProps) => (
        <a className='font-medium text-accent-neo underline-offset-8 hover:text-accent-hard-neo' {...props}/>
    ),
    h1: (props: HeadingProps) => (
<h1 className=' font-medium pt-12 mb-0  text-accent-neo' {...props}/>
    ),
    h2: (props: HeadingProps) => (
        <h2 className='font-medium pt-8 mb-0 text-accent-neo ' {...props} />
    ),
    h3: (props: HeadingProps) => (
        <h3 className='font-medium pt-8 mb-0 text-accent-neo ' {...props} />
    ),
    p: (props: ParagraphProps) => (
        <p className='' {...props}/>
    ),
    code: (props: CodeProps) => (
        <code className='bg-code-bg rounded-md text-accent-soft-neo px-2 ' {...props} />
    ),
    strong: (props: StrongProps) => (
        <strong className='text-accent-neo shadow-2xl rounded-2xl' {...props}/>
    )
    ,...components,
  }
}

