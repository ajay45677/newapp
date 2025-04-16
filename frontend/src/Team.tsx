import  { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

function Team({ orgName }) {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orgName) return;

        axios.get(`https://api.github.com/orgs/${orgName}/members`)
            .then(response => {
                setMembers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error.response?.data || error.message);
                setError(error);
                setLoading(false);
            });
    }, [orgName]);

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger" className="text-center mt-4">Error fetching members. Check console.</Alert>;

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">{orgName} Team Members</h2>
            <Row>
                {members.map(member => (
                    <Col key={member.id} md={4} sm={6} xs={12} className="mb-4">
                        <Card className="shadow-lg text-center">
                            <Card.Img variant="top" src={member.avatar_url} alt={member.login} className="p-3 rounded-circle" style={{ width: "100px", margin: "auto" }} />
                            <Card.Body>
                                <Card.Title>{member.login}</Card.Title>
                                <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">View Profile</a>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default function App() {
    return <Team orgName="google" />;  // Change to any GitHub organization
}
