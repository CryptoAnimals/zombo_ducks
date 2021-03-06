import React, { FC, useEffect, useRef } from 'react'

import { useBreakpoint } from '@apps/utils'

import styles from './Cursor.module.scss'

export const Cursor: FC = () => {
    const dotRef = useRef<HTMLDivElement>(null)
    const outlineRef = useRef<HTMLDivElement>(null)

    const breakpoint = useBreakpoint()
    const isDesktop = breakpoint === 'desktop'

    // @ts-ignore
    useEffect(() => {
        if (isDesktop) {
            const dot = dotRef.current
            const outline = outlineRef.current

            const handleMouseMove = (event: MouseEvent) => {
                const { clientX, clientY } = event

                requestAnimationFrame(() => {
                    if (dot && outline) {
                        dot.style.top = `${clientY}px`
                        dot.style.left = `${clientX}px`

                        outline.style.top = `${clientY}px`
                        outline.style.left = `${clientX}px`
                    }
                })
            }

            const handleMouseOut = () => {
                if (dot && outline) {
                    dot.style.opacity = '0'
                    outline.style.opacity = '0'
                }
            }

            const handleMouseOver = () => {
                if (dot && outline) {
                    dot.style.opacity = '1'
                    outline.style.opacity = '1'
                }
            }

            const handleMouseDown = () => {
                if (dot && outline) {
                    dot.style.width = '20px'
                    dot.style.height = '20px'
                    outline.style.opacity = '0'
                }
            }

            const handleMouseUp = () => {
                if (dot && outline) {
                    dot.style.width = '8px'
                    dot.style.height = '8px'
                    outline.style.opacity = '1'
                }
            }

            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseout', handleMouseOut)
            window.addEventListener('mouseover', handleMouseOver)
            window.addEventListener('mousedown', handleMouseDown)
            window.addEventListener('mouseup', handleMouseUp)

            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseout', handleMouseOut)
                window.removeEventListener('mouseover', handleMouseOver)
                window.removeEventListener('mousedown', handleMouseDown)
                window.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDesktop])

    if (!isDesktop) {
        return null
    }

    return (
        <>
            <div
                className={styles.dot}
                ref={dotRef}
            />

            <div
                className={styles.outline}
                ref={outlineRef}
            />
        </>
    )
}
