import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-purple-600 hover:bg-purple-50 dark:hover:bg-gray-700',
    outline: 'bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || loading ? disabledStyles : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <div className="spinner-small" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;