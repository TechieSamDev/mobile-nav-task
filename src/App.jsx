import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
  { title: 'Home', url: '/home' },
  {
    title: 'Products',
    children: [
      { title: 'Men', url: '/products/men' },
      { title: 'Women', url: '/products/women' },
      {
        title: 'Electronics',
        children: [
          { title: 'Phones', url: '/products/electronics/phones' },
          { title: 'Laptops', url: '/products/electronics/laptops' },
        ],
      },
    ],
  },
  {
    title: 'Services',
    children: [
      {
        title: 'Same Day Delivery',
        children: [
          {
            title: 'Day 1',
            children: [
              {
                title: 'Morning',
                url: '/services/same-day-delivery/day1/morning',
              },
              { title: 'Evening' },
            ],
          },
        ],
      },
      { title: 'Customized Services', url: '/services/customized-services' },
    ],
  },
  { title: 'About', url: '/about' },
  { title: 'Contact', url: '/contact' },
];

export default function App() {
  const [currentList, setCurrentList] = useState(navigation);
  const [history, setHistory] = useState([]);
  const [currentParent, setCurrentParent] = useState('');

  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.url) {
      navigate(item.url);
    }
    if (item.children) {
      setHistory([
        ...history,
        { parent: currentParent, children: currentList },
      ]);
      setCurrentList(item.children);
      setCurrentParent((prevTitle) =>
        prevTitle ? `${prevTitle} > ${item.title}` : item.title
      );
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevState = history.pop();
      setCurrentList(prevState.children);
      setCurrentParent(prevState.parent);
      setHistory([...history]);
    }
  };

  return (
    <div>
      {history.length > 0 && (
        <>
          <button onClick={goBack}>Back</button>
          <h3>{currentParent}</h3>
        </>
      )}
      <ul>
        {currentList.map((item) => (
          <li key={item.title} onClick={() => handleClick(item)}>
            {item.url ? <Link to={item.url}>{item.title}</Link> : item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
