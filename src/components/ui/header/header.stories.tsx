import type { Meta, StoryObj } from '@storybook/react'

import { Auth } from '@/components/auth/auth.types'

import { Header } from './header'

const meta = {
  argTypes: {},
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const data = {
  name: 'Johne_Silver',
} as Auth

export const HeaderLayout: Story = {
  args: {
    data,
    isLoggedIn: true,
  },
}
