import React, { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  style: string
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <main
      className={`mx-auto max-w-scr p-4 flex flex-col min-h-screen h-full ${style} `}
    >
      {children}
    </main>
  )
}

export default Container
