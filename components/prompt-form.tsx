'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'
// import * as pdfjsLib from 'pdfjs-dist'
import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
// import pdfjsLib from "../pdf-worker-loader"
import pdfToText from 'react-pdftotext'



export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [file, setFile] = React.useState<File | undefined>(undefined)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()
  const [fileContent, setFileContent] = React.useState<string>('')

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      
      setFile(event.target.files[0])
    }
    
    const file_pdf = event.target.files?.[0]
    if (file_pdf && file_pdf.type === 'application/pdf') {
      pdfToText(file_pdf)
            .then(text => setFileContent(text))
            .catch(error => console.error("Failed to extract text from pdf"))
    }
  }

  const handleFileOnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }


  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        // Optimistically add user message UI
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>
          }
        ])
        const formData = new FormData()

        formData.append('value', value)
        formData.append('file', file as Blob)

        setFile(undefined)

        // Submit and get response message
        const responseMessage = await submitUserMessage(value, fileContent)
        setMessages(currentMessages => [...currentMessages, responseMessage])
        setFileContent('')
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="absolute left-0 top-[14px] size-8 w-20 bg-background p-0 sm:left-4"
              onClick={handleFileOnClick}
              // onClick={() => {
              //   router.push('/new')
              // }}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              <span className="flex overflow-hidden text-ellipsis px-1 max-w-16">
                {file ? file.name : 'Add file'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add file</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
