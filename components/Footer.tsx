import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react'
import classes from '@/styles/Footer.module.css'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/eglenn-dev', Icon: IconBrandGithub },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/eglenn-dev', Icon: IconBrandLinkedin },
  { name: 'X', href: 'https://x.com/eglenn_dev', Icon: IconBrandX },
]

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <p className={classes.text}>&copy; {new Date().getFullYear()} Ethan Glenn</p>
        <div className={classes.social}>
          {socialLinks.map(({ name, href, Icon }) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
