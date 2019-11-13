import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { totalYogaUsers, removeYogaUsers } from '../../../../actions';
import { Card, CardBody, Col, Badge, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';

const YinTable = () => {
    const [data, setData] = useState('');
    const dispatch = useDispatch();
    const yogaUsers = useSelector(
        state => state.yoga_users
    );

    // console.log("yogaUsers", yogaUsers);

    useEffect(() => {
        dispatch(totalYogaUsers());
    }, [data])

    const handleDelete = (id) => {
        axios.post(`/yin-customers/${id}`).then(({ data }) => {
            setData(
                data
            );
        })
    }

    if (!yogaUsers) {
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
                            {yogaUsers.map((yinclient, index) => {
                                return (<tr key={yinclient.id}>
                                    <td>{index + 1}</td>
                                    <td><img style={{width: 20}} src={yinclient.imgurl} /></td>
                                    <td><Link to={`/yoga_user/${yinclient.id}`}>{yinclient.first} {yinclient.last}</Link></td>
                                    <td>{yinclient.email}</td>
                                    <td>{yinclient.phone}</td>
                                    <td><Badge color="danger" onClick={() => handleDelete(yinclient.id)}>Remove</Badge></td></tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col >
    )
}


export default YinTable;
