import React from 'react'
import { motion } from 'framer-motion'

interface WordFadeInProps {
  words: string
  className?: string
  delay?: number
}

const WordFadeIn: React.FC<WordFadeInProps> = ({ words, className = '', delay = 2.2 }) => {
  const wordArray = words.split(' ')

  return (
    <div className={className}>
      {wordArray.map((word, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: index * delay }
            }
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default WordFadeIn
