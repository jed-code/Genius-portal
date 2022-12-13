import React, { useState } from "react"
import { loginUser } from "../../Redux/Slices/userSlice";
import { useStore1Selector } from 'index';
import useFetch from './../../hooks/useFecth';
import { Col, Container, Row, CardBody } from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import MetaTag from "../../components/MetaTag";
import Projects from "./components/Projects";
import { DashboardPage } from "components/SCO_Name";
import { DashboardPageDefault } from "components/BreadCrum";
import MoalComp from '../../Modal';
import ProjectForm from "./components/ProjectForm";
import Loading from "components/Loading";


const Dashboard = () => {

    const userDet = useStore1Selector(loginUser);
    const token = userDet?.token;
    const userId = userDet?.data?.data?._id;
    const [openModal, setOpenModal] = useState(false);
    const { data, loading, reFetch } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/projects`, token);


    return (
        <React.Fragment>
            <div className="page-content m-5">
                <Breadcrumb default={DashboardPageDefault} title={DashboardPageDefault} />
                <MetaTag title_sco={DashboardPage} />

                <Container fluid>
                    <div className="page-title-box">
                        <button className="btn add__btn mb-4 text-white" onClick={() => setOpenModal(true)}>+ Add a new project </button>
                        {loading ? <Loading /> : <Projects data={data} />}
                    </div>
                </Container>
            </div>

            <MoalComp
                ModalTitle="Add a new project"
                open={openModal}
                onClose={() => setOpenModal(false)}
                cancel="close"
                Component={<ProjectForm onClose={() => setOpenModal(false)} reFetch={reFetch} />}
            />
        </React.Fragment>
    )
}

export default Dashboard