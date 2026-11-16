import { useInView } from '../../hooks/useInView';

/** Fades + lifts its children in the first time they scroll into view. */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={['reveal', inView && 'in', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}
