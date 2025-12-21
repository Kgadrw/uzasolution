'use client'

import { useEffect, useState } from 'react'

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    // Create snowflakes
    const createSnowflake = (id) => {
      const left = Math.random() * 100
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 5
      const opacity = Math.random() * 0.7 + 0.3
      const size = Math.random() * 4 + 2
      const swayAmount = Math.random() * 50 + 25
      
      return {
        id,
        left,
        duration,
        delay,
        opacity,
        size,
        swayAmount,
      }
    }

    // Initialize with 80 snowflakes
    const initialSnowflakes = Array.from({ length: 80 }, (_, i) => createSnowflake(i))
    setSnowflakes(initialSnowflakes)

    // Add new snowflakes periodically
    const interval = setInterval(() => {
      setSnowflakes((prev) => {
        // Remove oldest snowflake if we have too many
        const newSnowflakes = prev.length > 120 
          ? prev.slice(1)
          : prev
        
        // Add new snowflake
        return [...newSnowflakes, createSnowflake(Date.now() + Math.random())]
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute top-0 rounded-full"
          style={{
            left: `${snowflake.left}%`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.4)',
            animation: `snowfall ${snowflake.duration}s linear infinite`,
            animationDelay: `${snowflake.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

