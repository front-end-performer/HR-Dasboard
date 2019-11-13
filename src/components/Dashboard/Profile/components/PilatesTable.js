import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { totalPilatesUsers, removePilatesUser } from '../../../../actions';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';

const PilatesTable = () => {
    const [data, setData] = useState('');
    const dispatch = useDispatch();
    const pilatesUsers = useSelector(
        state => state.pilates_users
    );

    // console.log("pilatesUsers clients side ===>", pilatesUsers);


    useEffect(() => {
        dispatch(totalPilatesUsers());
    }, [data])

    const handleDelete = (id) => {
        axios.post(`/pilates-customers/${id}`).then(({ data }) => {
            setData(
                data
            );
        })
    }

    if (!pilatesUsers) {
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
                                <th>Avatar</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody style={{ overflowY: 'scroll', height: 500 }}>
                            {pilatesUsers.map((pilatesclient, index) => {
                                return (<tr key={pilatesclient.id}>
                                    <td>{index + 1}</td>
                                    <td><img style={{width: 20}} src={pilatesclient.imgurl} /></td>
                                    <td><Link to={`/pilates_user/${pilatesclient.id}`}>{pilatesclient.first} {pilatesclient.last}</Link></td>
                                    <td>{pilatesclient.email}</td>
                                    <td>{pilatesclient.phone}</td>
                                    <td><Badge color="danger" onClick={() => handleDelete(pilatesclient.id)}>Remove</Badge></td></tr>
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