import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const colors = [
    '#028090',
    '#3d348b',
    '#22223b',
    '#880d1e',
    '#e88873',
    '#A79277',
    '#C08B5C',
    '#FF6B6B',
    '#6B5B95',
    '#70AE6E',
    '#E58B8B',
    '#F67280',
    '#C06C84',
    '#6C5B7B',
    '#355C7D',
    '#F8B195',
    '#F67280',
    '#C06C84',
    '#6C5B7B',
    '#355C7D',
    '#6D6875',
    '#E6D3A3',
    '#7C7C7C',
    '#81B29A',
    '#F2CC8F',
  ];
  const [randomColor, setRandomColor] = useState('');
  const [quote, setQuote] = useState({ text: '', author: '' });

  // Function to generate random colors
  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    // Set random color when component mounts
    const color = generateRandomColor();
    setRandomColor(color);
    fetchQuote();
  }, []);

  // Function to fetch a new quote
  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote({ text: data.content, author: data.author });
      })
      .catch(error => console.error('Error fetching quote:', error));
  };

  // Function to handle button click
  const handleButtonClick = () => {
    const color = generateRandomColor();
    let newColor;
    do {
      newColor = generateRandomColor();
    } while (newColor === randomColor);
    setRandomColor(color);
    fetchQuote();
  };

  // Function to handle tweet button click
  const handleTweetButtonClick = () => {
    const tweetText = `"${quote.text}" - ${quote.author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="App" style={{ backgroundColor: randomColor }}>
      <div id="quote-box">
        <p id="text" style={{ color: randomColor }}>
          <img src="quote.png" alt="logo of quote" width='50px' /> {quote.text}
        </p>
        <p id="author" style={{ color: randomColor }}>
          - {quote.author}
        </p>
        <div className="buttons">
          <button id='tweet-quote' style={{ backgroundColor: randomColor }} onClick={handleTweetButtonClick}>
            <img src="twitter.png" alt="logo of twitter" />
          </button>
          <button id="new-quote" onClick={handleButtonClick} style={{ backgroundColor: randomColor }}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;