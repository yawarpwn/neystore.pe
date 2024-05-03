export const $ = (selector: string) => document.querySelector(selector)
export const $$ = (selector: string) => document.querySelectorAll(selector)

import { twMerge } from 'tailwind-merge'
import clsx, { type ClassArray } from 'clsx'

export const cn = (...inputs: ClassArray) => twMerge(clsx(...inputs))
