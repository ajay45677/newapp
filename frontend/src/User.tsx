
import { Container, Row, Col, Card } from "react-bootstrap";

function User() {
    const images = Array.from({ length: 9 }, (_, index) => `https://picsum.photos/200/200?random=${index}`);

    return (
        <Container className="mt-5">
            <Row>
                {images.map((url, index) => (
                    <Col md={4} sm={6} xs={12}>
                        <Card className="shadow-sm text-center mb-4" style={{ borderRadius: "10px" }}>
                              <img key={index} src={url} alt="Random"  />
                         </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default function App() {
    return <User />;
}