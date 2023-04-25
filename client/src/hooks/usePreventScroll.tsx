import { useEffect } from 'react'

interface Props {
  showMenu: boolean
}

export const usePreventScroll = ({ showMenu }: Props): void => {
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [showMenu])
}
