import { KakaoButton } from '@/ui/buttons/KakaoButton';
import { NaverButton } from '@/ui/buttons/NaverButton';
import { GoogleButton } from '@/ui/buttons/GoogleButton';
import { AppleButton } from '@/ui/buttons/AppleButton';
import { ButtonGroup } from '@/ui/buttons/ButtonGroup';

export { KakaoButton, type KakaoButtonProps } from '@/ui/buttons/KakaoButton';
export { NaverButton, type NaverButtonProps } from '@/ui/buttons/NaverButton';
export { GoogleButton, type GoogleButtonProps } from '@/ui/buttons/GoogleButton';
export { AppleButton, type AppleButtonProps } from '@/ui/buttons/AppleButton';
export { ButtonGroup, type ButtonGroupProps } from '@/ui/buttons/ButtonGroup';

/**
 * Button 네임스페이스
 *
 * @example
 * ```tsx
 * import { Button } from 'k-auth/ui';
 *
 * <Button.Group>
 *   <Button.Kakao onClick={() => signIn('kakao')} />
 *   <Button.Naver onClick={() => signIn('naver')} />
 *   <Button.Google onClick={() => signIn('google')} />
 *   <Button.Apple onClick={() => signIn('apple')} />
 * </Button.Group>
 * ```
 */
export const Button = {
  Kakao: KakaoButton,
  Naver: NaverButton,
  Google: GoogleButton,
  Apple: AppleButton,
  Group: ButtonGroup,
} as const;
