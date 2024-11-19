import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    axios.get('/api/websites').then((res) => setWebsites(res.data));
  }, []);

  return (
    <div>
      <h1>Website Downtime Monitor</h1>
      <ul>
        {websites.map((site) => (
          <li key={site._id}>
            {site.url} - {site.status} (Response Time: {site.responseTime}ms)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

