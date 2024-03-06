import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Container } from '@/components/ui/container/container'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

export type ModalProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'onOpenChange' | 'open'>
export const Modal = forwardRef<ElementRef<typeof DialogPrimitive.Root>, ModalProps>(
  ({ children, title, ...props }, ref) => (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={s.overlay} />
        <DialogPrimitive.Content className={s.content} ref={ref}>
          <div className={s.header}>
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close aria-label={'Close'} className={s.closeButton}>
              <Cross1Icon />
            </DialogPrimitive.Close>
          </div>
          <Container style={{ flexDirection: 'column', gap: '10px' }}>{children}</Container>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
)
