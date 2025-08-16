
import React, { useState } from 'react';
import { Table, Badge, Pagination, Form, InputGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import { FaCheckCircle, FaEdit, FaClock, FaTrash, FaSort } from 'react-icons/fa';

const MyArticles = () => {
  const articles = [
    { id: 1, title: 'React for Beginners', status: 'Published', category: 'Web Development', date: '2023-01-15', views: 1200 },
    { id: 2, title: 'Advanced React Concepts', status: 'Draft', category: 'Web Development', date: '2023-02-10', views: 0 },
    { id: 3, title: 'Component Design Patterns', status: 'Published', category: 'Software Design', date: '2023-03-20', views: 2500 },
    { id: 4, title: 'State Management with Redux', status: 'Review', category: 'Web Development', date: '2023-04-05', views: 0 },
    { id: 5, title: 'React Hooks Explained', status: 'Draft', category: 'Web Development', date: '2023-05-12', views: 0 },
    { id: 6, title: 'Building a REST API with Node.js', status: 'Published', category: 'Backend', date: '2023-06-18', views: 3500 },
    { id: 7, title: 'Introduction to GraphQL', status: 'Published', category: 'Backend', date: '2023-07-22', views: 1800 },
    { id: 8, title: 'Testing React Components', status: 'Draft', category: 'Testing', date: '2023-08-30', views: 0 },
    { id: 9, title: 'Server-Side Rendering with Next.js', status: 'Review', category: 'Web Development', date: '2023-09-14', views: 0 },
    { id: 10, title: 'Deploying React Apps', status: 'Published', category: 'DevOps', date: '2023-10-25', views: 5000 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const articlesPerPage = 5;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Published':
        return <Badge bg="success"><FaCheckCircle className="me-1" /> Published</Badge>;
      case 'Draft':
        return <Badge bg="warning"><FaEdit className="me-1" /> Draft</Badge>;
      case 'Review':
        return <Badge bg="info"><FaClock className="me-1" /> Review</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const sortedArticles = React.useMemo(() => {
    let sortableArticles = [...articles];
    if (sortConfig !== null) {
      sortableArticles.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableArticles;
  }, [articles, sortConfig]);


  const filteredArticles = sortedArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Articles</h3>
        <div className="d-flex">
            <Button variant="primary" className="me-3">Create New Article</Button>
            <Form>
                <InputGroup>
                    <FormControl
                    placeholder="Search by title..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </Form>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => requestSort('title')}>Title <FaSort /></th>
            <th>Status</th>
            <th>Category</th>
            <th onClick={() => requestSort('date')}>Date <FaSort /></th>
            <th onClick={() => requestSort('views')}>Views <FaSort /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article, index) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{getStatusBadge(article.status)}</td>
              <td>{article.category}</td>
              <td>{article.date}</td>
              <td>{article.views.toLocaleString()}</td>
              <td>
                <ButtonGroup>
                    <Button variant="outline-primary" size="sm"><FaEdit /></Button>
                    <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(filteredArticles.length / articlesPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

export default MyArticles;
