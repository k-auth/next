import { KakaoButton } from '@/ui/buttons/KakaoButton';
import { NaverButton } from '@/ui/buttons/NaverButton';
import { ButtonGroup } from '@/ui/buttons/ButtonGroup';

// 개별 export
export { KakaoButton, type KakaoButtonProps } from '@/ui/buttons/KakaoButton';
export { NaverButton, type NaverButtonProps } from '@/ui/buttons/NaverButton';
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
 * </Button.Group>
 * ```
 */
export const Button = {
  Kakao: KakaoButton,
  Naver: NaverButton,
  Group: ButtonGroup,
} as const;
