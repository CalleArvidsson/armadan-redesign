import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from '../useToggle';

describe('useToggle', () => {
  it('should allow setting and toggling value', () => {
    const { result } = renderHook(() => useToggle());
    const [, toggle] = result.current;

    expect(result.current[0]).toBe(false);

    act(() => {
      toggle(true);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      toggle();
    });

    expect(result.current[0]).toBe(false);
  });
});
