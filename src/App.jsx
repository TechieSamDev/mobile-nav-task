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
        children: [{ title: 'Day 1', url: '/services/same-delivery-day/day1' }],
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
      setHistory([...history, { list: currentList, parent: currentParent }]);
      setCurrentList(item.children);
      setCurrentParent(item.title);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevState = history.pop();
      setCurrentList(prevState.list);
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

// Task Breakdown

// Create a mobile navigation UI that displays a list of titles.

// // Navigation logic:
// - When a title with a URL is clicked, navigate to the specified URL.
// - When a title with children is clicked, replace the current list with the list of child titles.

// // Child navigation logic:
// - If a child title with a URL is clicked, navigate to that URL.
// - If a child title with its own children is clicked, replace the current list with that child’s titles.

// // Parent navigation display:
// - When a list of child titles is shown, display the parent title at the top along with a back button.
// - Back button behavior: Clicking the back button should return the user to the previous list (parent titles).

// // Dynamic structure handling:
// - The structure of titles can be modified at any time with new children added to titles.
// - The code must handle unlimited nesting of children and grandchildren dynamically, ensuring the UI correctly reflects any changes to the data at all levels of the hierarchy.
