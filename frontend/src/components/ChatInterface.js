import React, { useState } from 'react';

function ChatInterface() {
  const [input, setInput] = useState(''); // For milestone lookup
  const [domain, setDomain] = useState(''); // For domain selection
  const [level, setLevel] = useState(''); // For level selection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');

  // Handle input change
  const handleInputChange = (event) => setInput(event.target.value);
  const handleDomainChange = (event) => setDomain(event.target.value);
  const handleLevelChange = (event) => setLevel(event.target.value);

  // Lookup Milestone
  const handleLookupMilestone = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'Lookup Milestone', code: input }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setError('Failed to send message');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // List Domain
  const handleListDomain = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'List Domain', domain, level }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setError('Failed to send message');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Input for Milestone Lookup */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter Milestone Code"
        disabled={loading}
      />
      <button onClick={handleLookupMilestone} disabled={loading}>
        Lookup Milestone
      </button>

      {/* Dropdowns for Domain and Level */}
      <select value={domain} onChange={handleDomainChange}>
        <option value="">Select Domain</option>
        <option value="Domain1">Domain 1</option>
        <option value="Domain2">Domain 2</option>
      </select>

      <select value={level} onChange={handleLevelChange}>
        <option value="">Select Level</option>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
      </select>

      <button onClick={handleListDomain} disabled={loading}>
        List Domain
      </button>

      {/* Show loading, error, or response */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default ChatInterface;
