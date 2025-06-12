import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

declare module '../src/components/ui/button' {
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }
  export const Button: FC<ButtonProps>;
  export const buttonVariants: any;
}

declare module '../src/components/ui/card' {
  interface CardProps {
    className?: string;
    children: ReactNode;
  }
  export const Card: FC<CardProps>;
}

declare module '../src/components/ui/input' {
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
  export const Input: FC<InputProps>;
}

declare module '../src/components/ui/label' {
  interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
  export const Label: FC<LabelProps>;
}

declare module '../src/components/ui/select' {
  interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    required?: boolean;
    children: ReactNode;
  }
  interface SelectTriggerProps {
    children: ReactNode;
  }
  interface SelectValueProps {
    placeholder?: string;
  }
  interface SelectContentProps {
    children: ReactNode;
  }
  interface SelectItemProps {
    value: string;
    children: ReactNode;
  }
  export const Select: FC<SelectProps>;
  export const SelectTrigger: FC<SelectTriggerProps>;
  export const SelectValue: FC<SelectValueProps>;
  export const SelectContent: FC<SelectContentProps>;
  export const SelectItem: FC<SelectItemProps>;
} 