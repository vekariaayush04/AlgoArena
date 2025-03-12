"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const ThemeToggleButton = () => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    
    useEffect(() => {
        setMounted(true)
    }, [])
    
    if (!mounted) {
        return null
    }
    
    const isDark = resolvedTheme === "dark"
    
    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    }
    
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            {isDark ? (
                <Sun size={24} className="text-yellow-500" />
            ) : (
                <Moon size={24} className="text-blue-500" />
            )}
        </button>
    )
}

export default ThemeToggleButton    