import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// const navigation = [
//   { title: 'Home', url: '/home' },
//   {
//     title: 'Products',
//     children: [
//       { title: 'Men', url: '/products/men' },
//       { title: 'Women', url: '/products/women' },
//       {
//         title: 'Electronics',
//         children: [
//           { title: 'Phones', url: '/products/electronics/phones' },
//           { title: 'Laptops', url: '/products/electronics/laptops' },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Services',
//     children: [
//       {
//         title: 'Same Day Delivery',
//         children: [
//           {
//             title: 'Customized Services',
//             url: '/services/customized-services',
//           },
//         ],
//       },
//       { title: 'Customized Services', url: '/services/customized-services' },
//     ],
//   },
//   { title: 'About', url: '/about' },
//   { title: 'Contact', url: '/contact' },
// ];
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
          {
            title: 'Laptops',
            children: [
              {
                title: 'Gaming Laptops',
                url: '/products/electronics/laptops/gaming',
              },
              {
                title: 'Business Laptops',
                url: '/products/electronics/laptops/business',
              },
              {
                title: 'Ultrabooks',
                children: [
                  {
                    title: 'Lightweight',
                    url: '/products/electronics/laptops/ultrabooks/lightweight',
                  },
                  {
                    title: 'Performance',
                    url: '/products/electronics/laptops/ultrabooks/performance',
                  },
                ],
              },
            ],
          },
          {
            title: 'Accessories',
            children: [
              {
                title: 'Chargers',
                url: '/products/electronics/accessories/chargers',
              },
              {
                title: 'Headphones',
                url: '/products/electronics/accessories/headphones',
              },
            ],
          },
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
            title: 'Customized Services',
            children: [
              {
                title: 'Personalized Gifts',
                url: '/services/customized-services/personalized-gifts',
              },
              {
                title: 'Business Packages',
                children: [
                  {
                    title: 'Corporate Events',
                    url: '/services/customized-services/business-packages/corporate-events',
                  },
                  {
                    title: 'Workshops',
                    url: '/services/customized-services/business-packages/workshops',
                  },
                ],
              },
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

  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.url) {
      navigate(item.url);
    } else if (item.children) {
      setHistory([
        ...history,
        {
          parent: item.title,
          children: currentList,
        },
      ]);
      setCurrentList(item.children);
    }
  };

  const goBack = () => {
    if (history.length <= 0) return;

    const prevList = history.pop();
    setCurrentList(prevList.children);
  };

  return (
    <div>
      {history.length > 0 && (
        <>
          <button onClick={goBack}>Back</button>
          <h3>{history.map((item) => item.parent).join(' > ')}</h3>
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
