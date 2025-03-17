import { PlayCircleOutlined, PauseOutlined } from '@ant-design/icons';
import { Card, Button, Select } from 'antd';
import React from 'react';

import { useAnimationStore } from '@/store/animationStore';

const AnimationControls: React.FC = () => {
  const { isPlaying, setIsPlaying, selectedAnimation, setSelectedAnimation, availableAnimations } = useAnimationStore();

  return (
    <Card className="card" title="动画控制">
      {availableAnimations.length > 0 ? (
        <>
          <p>选择动画：</p>
          <Select
            style={{ width: '100%' }}
            placeholder="选择动画"
            value={selectedAnimation}
            onChange={(value) => setSelectedAnimation(value)}
          >
            {availableAnimations.map((anim) => (
              <Select.Option key={anim} value={anim}>
                {anim}
              </Select.Option>
            ))}
          </Select>

          <Button
            icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
            onClick={() => setIsPlaying(!isPlaying)}
            className="button"
            disabled={!selectedAnimation}
          >
            {isPlaying ? '暂停动画' : '播放动画'}
          </Button>
        </>
      ) : (
        <p>当前模型没有动画</p>
      )}
    </Card>
  );
};

export default AnimationControls;
