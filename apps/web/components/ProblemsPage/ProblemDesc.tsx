import remarkGfm from 'remark-gfm'
import React from 'react';
import Markdown from "react-markdown"
import { Step } from '../LandingPage/StepBox';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

interface Problem {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: Difficulty;
  createdAt: Date;
  updatedAt: Date;
}

export const ProblemComponent: React.FC<{ problem: any }> = ({ problem }) => {
  return (
    <div className="px-6 py-3 bg-slate-900 rounded-lg text-slate-100 relative">
      <div className='flex justify-between mt-5'>
     <h1 className="text-3xl font-bold">{problem.title}</h1>
      {/* <span className='absolute right-5 top-6'> */}
      <Step data={problem.difficulty.toLowerCase()} variant={problem.difficulty}></Step>
      {/* </span> */}
      </div>
      
      <div className="prose prose-invert max-w-none mb-6">
        <pre className="whitespace-pre-wrap font-sans text-lg">
         <MarkdownRenderer content={problem.description}></MarkdownRenderer>
        </pre>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700">
        <h2 className="text-lg font-semibold mb-2">Constraints</h2>
        <ul className="list-disc list-inside space-y-1 text-slate-300">
          <li>1 ≤ arr.length ≤ 10⁴</li>
          <li>-10⁹ ≤ arr[i] ≤ 10⁹</li>
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700 mb-4">
        <h2 className="text-lg font-semibold mb-4">Related Topics</h2>
        <div className="flex gap-2">
          {['Array', 'Two Pointers'].map(topic => (
            <span 
              key={topic}
              className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// // Example usage:
// const exampleProblem: Problem = {
//   id: "1",
//   title: "Reverse an Array",
//   description: `Given an array arr of integers, your task is to write a function that reverses the array. The reversed array should have the elements in the opposite order compared to the original array.

// ### Example 1
// Input: arr = [1, 2, 3, 4, 5]
// Output: [5, 4, 3, 2, 1]

// ### Example 2
// Input: arr = [10, 9, 8]
// Output: [8, 9, 10]`,
//   slug: "reverse-an-array",
//   difficulty: Difficulty.EASY,
//   createdAt: new Date(),
//   updatedAt: new Date()
// };

// // Render the component in your app:
// // <ProblemComponent problem={exampleProblem} />



interface MarkdownRendererProps {
  content: string;
}

// Fix for SyntaxHighlighter ref type issue
const TypedSyntaxHighlighter = SyntaxHighlighter as React.ComponentClass<
  React.ComponentProps<typeof SyntaxHighlighter> & { ref?: React.Ref<typeof SyntaxHighlighter> }
>;

// Define proper types for the code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold"  />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-semibold" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-medium" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="text-md leading-relaxed" {...props} />
        ),
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <TypedSyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              className="rounded-lg my-4 text-black"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </TypedSyntaxHighlighter>
          ) : (
            <code className="bg-[#1E293B] text-white dark:bg-gray-800 rounded-md flex p-4" {...props}>
              {children}
            </code>
          );
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto">
            <table className="min-w-full my-4 border-collapse" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-2 text-left bg-gray-100 dark:bg-gray-800 border" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-2 border" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-8 my-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-8 my-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};