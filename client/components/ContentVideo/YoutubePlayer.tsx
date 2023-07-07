import YouTube, { YouTubeProps } from 'react-youtube';

interface YoutubePlayerProps {
  videoId: string;
}

const YoutubePlayer = ( { videoId } : YoutubePlayerProps) => {
  const _onPlay: YouTubeProps['onStateChange'] = async (event) => {
    const current = await event.target.getCurrentTime()
    const duration = await event.target.getDuration()
    console.log(current/duration * 100);
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube onStateChange={_onPlay} opts={opts} videoId={videoId} />;
}

export default YoutubePlayer;
