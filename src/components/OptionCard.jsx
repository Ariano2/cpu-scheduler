import { useNavigate } from 'react-router-dom';

const OptionCard = ({ props }) => {
  const navigate = useNavigate();
  const GoToNewPage = () => {
    navigate(props?.url);
  };
  return (
    <div>
      <h2>{props?.algoName}</h2>
      <div>
        <a
          onClick={() => {
            handleLinkClick(props?.link);
          }}
        >
          Learn More
        </a>
        <button onClick={GoToNewPage}>Demo</button>
      </div>
    </div>
  );
};

const handleLinkClick = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default OptionCard;
