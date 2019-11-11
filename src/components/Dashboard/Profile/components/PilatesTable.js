import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';

const PilatesTable = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/pilates-customers');
            setData(
                data
            );
        })();
    }, [data])

    const handleDelete = (id) => {
        console.log('sdsd', id);
        axios.post(`/pilates-customers/${id}`).then(({ data }) => {
            console.log("handleDelete", data);
            setData(
                data
            );
        })
    }

    if (!data) {
        return null;
    }

    return (
        < Col md={12} lg={12} xl={12} style={{ padding: 0 }}>
            <Card>
                <CardBody>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Contract expiration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody style={{ overflowY: 'scroll', height: 500 }}>
                            {data.map((emploee, index) => {
                                return (<tr key={emploee.id}>
                                            <td>{index + 1}</td>
                                            <td>{emploee.first} {emploee.last}</td>
                                    <td><Link to={`/user/${emploee.id}`}>{emploee.last}</Link></td>
                                            <td>{emploee.last}</td>
                                            <td>{emploee.email}</td>
                                    <td><Badge color="success" onClick={() => handleDelete(emploee.id)}>SignedUp</Badge></td></tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col >
    )
}

export default PilatesTable;