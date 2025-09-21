import { useState, useEffect } from "react"

export const useTypewriter = (words: string[]) => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [delay, setDelay] = useState(100)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[index]
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text !== currentWord) {
        // Escribiendo
        setText(currentWord.substring(0, text.length + 1))
        setDelay(100) // velocidad de escritura
      } else if (!isDeleting && text === currentWord) {
        // Palabra completa, preparar para borrar
        setDelay(2000) // pausa antes de borrar
        setIsDeleting(true)
      } else if (isDeleting && text !== "") {
        // Borrando
        setText(text.substring(0, text.length - 1))
        setDelay(50) // velocidad de borrado
      } else if (isDeleting && text === "") {
        // Terminó de borrar
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
        setDelay(100) // velocidad para empezar la próxima palabra
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, index, isDeleting, delay, words])

  return text
}