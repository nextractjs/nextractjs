import React, { useEffect, useState } from 'react'

export interface WithFontsProps {
  isDisabled: boolean
}

const GoogleFonts = () => {
  const [style, setStyle] = useState('')

  // Add the font stylesheet only client-side.
  useEffect(
    () =>
      setStyle(
        "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=PT+Sans:wght@400;700&display=swap');",
      ),
    [],
  )

  return <style>{style}</style>
}

const withFonts = <T extends object>(Component: React.ComponentType<T>) => {
  return (props: T & WithFontsProps) => (
    <>
      {!props.isDisabled && <GoogleFonts />}
      <Component {...(props as T)} />
    </>
  )
}

export default withFonts
