import { CodeBlock, Code } from '@atlaskit/code'

const Block = ({ code, language, filename, highlight = '' }) => (
  <div className="my-5 flex max-w-full flex-col gap-1 overflow-x-auto">
    {filename && (
      <div className="flex w-fit flex-row flex-nowrap items-center justify-between gap-x-1 rounded-[3px] bg-[#f4f6fc] p-1 dark:bg-[#273447]">
        <p className="!mt-0 text-sm">{filename}</p>
      </div>
    )}
    <div className="CodeBlockWrapper">
      <CodeBlock language={language} showLineNumbers={true} text={code} highlight={highlight} />
    </div>
  </div>
)

const Line = ({ children }) => <Code>{children}</Code>

export { Block, Line }
