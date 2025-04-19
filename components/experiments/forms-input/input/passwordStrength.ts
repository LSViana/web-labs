export enum PasswordStrength {
  weak = 'Weak',
  medium = 'Medium',
  strong = 'Strong',
}

export const passwordStrengthTextClasses: Record<PasswordStrength, string> = {
  [PasswordStrength.weak]: 'text-red-500',
  [PasswordStrength.medium]: 'text-yellow-500',
  [PasswordStrength.strong]: 'text-green-500',
}

export const passwordStrengthContainerClasses: Record<PasswordStrength, string> = {
  [PasswordStrength.weak]: 'bg-red-500',
  [PasswordStrength.medium]: 'bg-yellow-500',
  [PasswordStrength.strong]: 'bg-green-500',
}
