import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-50';

  const variants = {
    primary:
      'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800',
    secondary:
      'bg-teal-700 text-white hover:bg-teal-600 focus:ring-teal-700',
    outline:
      'border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white focus:ring-slate-800',
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
