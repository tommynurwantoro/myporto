import { useEffect, ReactNode, useState } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';
import { cn } from '../../utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-7xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'lg' }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle open animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Trigger animation after render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Wait for close animation before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = '';
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'transition-opacity duration-300',
        isAnimating ? 'opacity-100' : 'opacity-0'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={(e) => {
        // Close when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-50 w-full',
          sizeClasses[size],
          'bg-gray-900 rounded-lg border border-gray-700',
          'max-h-[90vh] overflow-hidden',
          'flex flex-col',
          'transition-all duration-300 ease-out',
          isAnimating
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 id="modal-title" className="text-2xl font-bold gradient-text">
              {title}
            </h2>
            <IconButton
              onClick={onClose}
              aria-label="Close modal"
              size="sm"
              className="text-gray-400 hover:text-emerald-400"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </IconButton>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

