import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import { totalUsers } from '../../../../actions';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';

const Clients = () => {
    const [data, setData] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/total-clients');
            setData(
                data
            );
        })();
    }, [data])

    useEffect(() => {
        dispatch(totalUsers());
    }, [data]);

    const handleDelete = (id) => {
        axios.post(`/delete-client/${id}`).then(({ data }) => {
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
                <CardBody style={{height: 500, overflowY: 'scroll'}}>
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
                                    <td><Badge color="success" onClick={() => handleDelete(emploee.id)}>Remove client</Badge></td></tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col >
    )
}

export default Clients;