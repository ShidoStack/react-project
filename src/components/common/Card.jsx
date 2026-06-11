export default function Card({ as: Component = 'article', className = '', children }) {
  return <Component className={`premium-card bg-white ${className}`}>{children}</Component>;
}
