import { useEffect } from 'react'

interface Props {
  showMenu: boolean
}

export const usePreventScrollY = ({ showMenu }: Props): void => {
  useEffect(() => {
    const subscribed = true
    if (subscribed) {
      document.body.style.overflowY = showMenu ? 'hidden' : 'auto'
    }
  }, [showMenu])
}
