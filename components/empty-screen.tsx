import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import Image from 'next/image'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col md:flex-row items-center gap-6 rounded-xl m-2 sm:rounded-full border bg-background p-6">
        <Image
          src={
            'https://science4us.explorelearning.com/user_area/content_media/raw/s4u-help-brainybot-squinkles.svg'
          }
          alt="assistant-bot"
          width={180}
          height={208}
          className="w-20 h-auto md:w-80 md:h-auto"
        />
        <div>
          <h1 className="text-lg font-bold">
            Welcome to <span className="text-muted">Extia</span> AI Chatbot!
          </h1>
          <p className="leading-normal">
            Your ultimate job search assistant! Our innovative app is designed
            to help you maximize your career opportunities ensuring you stand
            out to potential employers. We are sponsored by{' '}
            <ExternalLink href="https://www.extia-group.com/es-en">
              Extia.
            </ExternalLink>
          </p>
        </div>
      </div>
    </div>
  )
}
