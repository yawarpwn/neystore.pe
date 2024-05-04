export const $ = (selector: string) => document.querySelector(selector)
export const $$ = (selector: string) => document.querySelectorAll(selector)

import { twMerge } from 'tailwind-merge'
import clsx, { type ClassArray } from 'clsx'

export function cn(...inputs: ClassArray) {
  return twMerge(clsx(...inputs))
}

export function formatedToLocal(num: number) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(num)
}
