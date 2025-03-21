import { useRef, useCallback } from 'react';

import { useUIStore } from '@/store/uiStore';

/**
 * 🎯 Hook: 处理 Sidebar 拖拽调整宽度
 */
export function useSidebarResize() {
  const { sidebarWidth, setSidebarWidth } = useUIStore();
  const isResizing = useRef(false);
  const animationFrameId = useRef<number | null>(null); // ✅ 记录 `requestAnimationFrame`

  // ✅ 处理拖拽逻辑
  const handleMouseMove = useCallback(
    (event: PointerEvent) => {
      if (!isResizing.current) return;
      event.preventDefault(); // 🔹 防止默认拖拽行为

      // ✅ 使用 requestAnimationFrame 限制更新频率
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        const newWidth = Math.max(250, Math.min(600, window.innerWidth - event.clientX));
        setSidebarWidth(newWidth);
      });
    },
    [setSidebarWidth],
  );

  // ✅ 结束拖拽
  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.classList.remove('dragging');
    document.body.style.cursor = 'default';
    document.body.style.touchAction = '';
    document.body.style.userSelect = '';

    // ✅ 确保移除 `mousemove` 事件
    document.removeEventListener('pointermove', handleMouseMove);
    document.removeEventListener('pointerup', stopResizing);

    // ✅ 取消可能存在的 `requestAnimationFrame`
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, [handleMouseMove]);

  // ✅ 开始拖拽
  const startResizing = useCallback(() => {
    isResizing.current = true;
    document.body.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.touchAction = 'none';
    document.body.style.userSelect = 'none';

    document.addEventListener('pointermove', handleMouseMove);
    document.addEventListener('pointerup', stopResizing);
  }, [handleMouseMove, stopResizing]);

  return { sidebarWidth, startResizing };
}
