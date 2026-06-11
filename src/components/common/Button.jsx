export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    subtle: 'rounded-lg border border-gray-200 bg-white text-[#1a1c1d] transition hover:border-[#3730a3] hover:text-[#3730a3]',
  };

  return (
    <button className={`${styles[variant]} ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}
