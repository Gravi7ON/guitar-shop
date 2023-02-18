import './loading-screen.css';

export default function LoadingScreen(): JSX.Element {
  return (
    <div className='spinner'>
      <div className='spinner-text'>Loading ...</div>
    </div>
  );
}
