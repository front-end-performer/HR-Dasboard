import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import { totalUsers } from '../../../../actions';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';

const Clients = () => {
    const [data, setData] = useState('');
    const dispatch = useDispatch();
    const clientsTotal = useSelector(
        state => state.data
    );

    // useEffect(() => {
    //     (async () => {
    //         const { data } = await axios.get('/total-clients');
    //         setData(
    //             data
    //         );
    //     })();
    // }, [])

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

    if (!clientsTotal) {
        return null;
    }

    return (
        < Col md={12} lg={12} xl={12} style={{ padding: 0 }}>
            <Card>
                <CardBody style={{ height: 500, overflowY: 'scroll' }}>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Avatar</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Package</th>
                                <th>DOB</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody style={{ overflowY: 'scroll', height: 500 }}>
                            {clientsTotal.map((client, index) => {
                                return (<tr key={client.id}>
                                    <td>{index + 1}</td>
                                    <td><img style={{width: 20}} src={client.imgurl} /></td>
                                    <td><Link to={`/user/${client.id}`}>{client.first} {client.last}</Link></td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.address}</td>
                                    <td>{client.package}</td>
                                    <td>{client.dob}</td>
                                    <td><Badge color="danger" onClick={() => handleDelete(client.id)}>Remove client</Badge></td>
                                    <td>{client.time_stamp}</td>
                                </tr>
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