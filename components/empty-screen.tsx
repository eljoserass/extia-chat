import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import Image from 'next/image'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-row items-center gap-6 rounded-lg border bg-background p-8">
        <Image
          src={
            'https://science4us.explorelearning.com/user_area/content_media/raw/s4u-help-brainybot-squinkles.svg'
          }
          alt="assistant-bot"
          width={180}
          height={208}
        />
        <div>
          <h1 className="text-lg font-semibold">
            Welcome to Extia AI Chatbot!
          </h1>
          <p className="leading-normal text-muted-foreground">
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
