export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    subtle: 'rounded-lg border border-gray-200 bg-white text-on-surface transition hover:border-brand-indigo hover:text-brand-indigo',
  };

  return (
    <button className={`${styles[variant]} ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}
