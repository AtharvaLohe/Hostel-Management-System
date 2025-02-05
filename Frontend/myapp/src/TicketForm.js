import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from './userSlice';  // Adjust the path accordingly
const TicketForm = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [ticketDetails, setTicketDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status
  const [hostlerId, setHostlerId] = useState(null); // State to hold the hostlerId
   const userDetails = useSelector((state) => state.user.userDetails); 
  // Fetch userId from localStorage and map it to hostlerId
  useEffect(() => {

    console.log('Fetched user details from localStorage:', userDetails); // Log the user details

    if (userDetails && userDetails.userid) { // Check for `userid` (lowercase)
      setHostlerId(userDetails.userid); // Map `userid` to `hostlerId`
      console.log('Hostler ID (mapped from userid):', userDetails.userid); // Log the hostlerId
    } else {
      console.log('No userid found in localStorage'); // Log if no `userid` is found
    }
  }, []); // Only run once when the component mounts

  // Fetch issues from the backend API when the component mounts
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        console.log('Fetching issues...');
        
        const response = await fetch('https://localhost:7182/api/Issue'); // Correct URL for issues
        if (!response.ok) {
          throw new Error('Failed to fetch issues');
        }
        
        const data = await response.json();
        console.log('Fetched issues:', data);
        
        if (Array.isArray(data) && data.length > 0) {
          setIssues(data);
        } else {
          setError('No issues available');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Handle when the user selects an issue from the dropdown
  const handleSelectChange = (e) => {
    setSelectedIssue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedIssue || !ticketDetails.trim()) {
      setError('Please select an issue and provide ticket details');
      return;
    }

    // Ensure that hostlerId is available before submitting
    if (!hostlerId) {
      setError('Hostler ID is missing');
      console.log('Error: Hostler ID is missing');
      return;
    }

    // Create ticket data object with exact field names for IssueId, HostlerId, and Description
    const ticketData = {
      IssueId: selectedIssue,
      HostlerId: hostlerId, // Now using the hostlerId mapped from `userid`
      Description: ticketDetails,
    };

    console.log('Submitting ticket data:', ticketData); // Debugging log
    setIsSubmitting(true);
  
    try {
      const response = await fetch('https://localhost:7182/api/Ticket/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
      }

      const data = await response.json();
      console.log('Ticket submitted:', data);
      setSuccessMessage('Ticket raised successfully!');
      setSelectedIssue('');
      setTicketDetails('');
      setError(null);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setError('Failed to submit ticket: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded" style={{ backgroundColor: '#f9f9f9' }}>
        <h1 className="text-center mb-4 text-primary">Create a New Ticket</h1>

        {loading && <div className="alert alert-info">Loading issues...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {!loading && !error && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="issue" className="form-label text-secondary">Select Issue</label>
              <select
                id="issue"
                value={selectedIssue}
                onChange={handleSelectChange}
                className="form-select"
                required
              >
                <option value="">-- Select an Issue --</option>
                {issues.length > 0 ? (
                  issues.map((issue) => (
                    <option key={issue.issueId} value={issue.issueId}>
                      {issue.issueName}
                    </option>
                  ))
                ) : (
                  <option disabled>No issues available</option>
                )}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="ticket-details" className="form-label text-secondary">Ticket Details</label>
              <textarea
                id="ticket-details"
                value={ticketDetails}
                onChange={(e) => setTicketDetails(e.target.value)}
                placeholder="Describe your issue..."
                className="form-control"
                style={{ minHeight: '150px' }}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2 mt-3"
              style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TicketForm;
