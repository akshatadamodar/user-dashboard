import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    // In standard routing, we'd get the ID from props
    // For this simple setup, we'll grab it from the URL path
    const id = window.location.pathname.split("/").pop();
    
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ user: data, loading: false }));
  }

  render() {
    const { user, loading } = this.state;

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found.</p>;

    return (
      <div className="detail-card">
        <Link to="/"><button>Back to Dashboard</button></Link>
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <hr />
        <h3>Address</h3>
        <p>{user.address.suite}, {user.address.street}, {user.address.city}</p>
        <h3>Company</h3>
        <p>{user.company.name}</p>
      </div>
    );
  }
}

export default UserDetail;