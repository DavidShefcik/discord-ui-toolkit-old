import React from 'react';

import OldLoadingAnimation from '@assets/videos/old_loading_icon.webm';
import NewLoadingAnimation from '@assets/videos/new_loading_icon.webm';

interface DiscordLoadingAnimationProps {
  version: 'old' | 'new';
  size?: string;
}

export default function DiscordLoadingAnimation({ version, size = '100%' }: DiscordLoadingAnimationProps) {
  return (
    <div style={{ width: size, height: size }}>
      <video width={size} height={size} autoPlay loop>
        <source src={version === 'new' ? NewLoadingAnimation : OldLoadingAnimation} type="video/webm" />
      </video>
    </div>
  );
}

export { DiscordLoadingAnimationProps };
