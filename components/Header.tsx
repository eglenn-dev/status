import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import classes from '@/styles/Header.module.css'
import { pageConfig } from '@/uptime.config'

function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme('light')

  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      size="lg"
      aria-label="Toggle theme"
      className={classes.themeToggle}
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
    >
      {colorScheme === 'dark' ? <IconMoon size={22} /> : <IconSun size={22} />}
    </ActionIcon>
  )
}

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <nav className={classes.links}>
          {pageConfig.links?.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className={classes.link}
              data-active={link.highlight || undefined}
              rel="noreferrer noopener"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
