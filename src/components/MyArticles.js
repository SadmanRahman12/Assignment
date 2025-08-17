
import React, { useState } from 'react';
import { Table, Badge, Pagination, Form, InputGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import { FaCheckCircle, FaEdit, FaClock, FaTrash, FaSort } from 'react-icons/fa';

const MyArticles = () => {
  const articles = [
    { id: 1, title: 'C++ for Beginners', status: 'Published', category: 'Language', date: '2023-01-15', views: 1200 },
    { id: 2, title: 'Advanced C++ Concepts', status: 'Draft', category: 'Language', date: '2023-02-10', views: 0 },
    { id: 3, title: 'Component Design Patterns', status: 'Published', category: 'Software Design', date: '2023-03-20', views: 2500 },
    { id: 4, title: 'State Management with Redux', status: 'Review', category: 'Web Development', date: '2023-04-05', views: 0 },
    { id: 5, title: 'React Hooks Explained', status: 'Draft', category: 'Web Development', date: '2023-05-12', views: 0 },
    { id: 6, title: 'Building a REST API with Node.js', status: 'Published', category: 'Backend', date: '2023-06-18', views: 3500 },
    { id: 7, title: 'Introduction to GraphQL', status: 'Published', category: 'Backend', date: '2023-07-22', views: 1800 },
    { id: 8, title: 'Testing React Components', status: 'Draft', category: 'Testing', date: '2023-08-30', views: 0 },
    { id: 9, title: 'Server-Side Rendering with Next.js', status: 'Review', category: 'Web Development', date: '2023-09-14', views: 0 },
    { id: 10, title: 'Deploying React Apps', status: 'Published', category: 'DevOps', date: '2023-10-25', views: 5000 },
    { id: 11, title: 'Getting Started with Docker', status: 'Published', category: 'DevOps', date: '2023-11-05', views: 6200 },
    { id: 12, title: 'CI/CD with GitHub Actions', status: 'Review', category: 'DevOps', date: '2023-11-20', views: 0 },
    { id: 13, title: 'JavaScript Promises and Async/Await', status: 'Published', category: 'Web Development', date: '2023-12-10', views: 4100 },
    { id: 14, title: 'Building Microservices with Express', status: 'Draft', category: 'Backend', date: '2024-01-05', views: 0 },
    { id: 15, title: 'Advanced CSS Grid Layouts', status: 'Published', category: 'Web Development', date: '2024-01-20', views: 3200 },
    { id: 16, title: 'Introduction to TypeScript', status: 'Published', category: 'Web Development', date: '2024-02-15', views: 7200 },
    { id: 17, title: 'State Management with Zustand', status: 'Draft', category: 'Web Development', date: '2024-03-10', views: 0 },
    { id: 18, title: 'Building a Design System with Storybook', status: 'Published', category: 'Software Design', date: '2024-04-20', views: 4500 },
    { id: 19, title: 'End-to-End Testing with Cypress', status: 'Review', category: 'Testing', date: '2024-05-05', views: 0 },
    { id: 20, title: 'React Performance Optimization', status: 'Draft', category: 'Web Development', date: '2024-06-12', views: 0 },
    { id: 21, title: 'Building a Serverless API with AWS Lambda', status: 'Published', category: 'Backend', date: '2024-07-18', views: 5500 },
    { id: 22, title: 'Problem Solving Best Practices', status: 'Published', category: 'Competative Programming', date: '2024-08-22', views: 2800 },
    { id: 23, title: 'Introduction to WebAssembly', status: 'Draft', category: 'Web Development', date: '2024-09-30', views: 0 },
    { id: 24, title: 'Data Visualization with D3.js', status: 'Review', category: 'Web Development', date: '2024-10-14', views: 0 },
    { id: 25, title: 'Building a Progressive Web App (PWA)', status: 'Published', category: 'Web Development', date: '2024-11-25', views: 6800 },
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
