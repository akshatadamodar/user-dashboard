import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchTerm: '',
      sortConfig: { key: 'name', direction: 'asc' }
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  requestSort = (key) => {
    let direction = 'asc';
    if (this.state.sortConfig.key === key && this.state.sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    this.setState({ sortConfig: { key, direction } });
  }

  render() {
    const { users, searchTerm, sortConfig } = this.state;

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      let aValue = sortConfig.key === 'company' ? a.company.name : a[sortConfig.key];
      let bValue = sortConfig.key === 'company' ? b.company.name : b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return (
      <div>
        <div className="controls">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={this.handleSearch}
            className="search-input"
          />
          <button onClick={() => this.requestSort('name')}>
            Sort by Name ({sortConfig.direction})
          </button>
          <button onClick={() => this.requestSort('company')}>Sort by Company</button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => (
              <tr key={user.id}>
                <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;