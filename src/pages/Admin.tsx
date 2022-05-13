import { useParams } from "react-router-dom";
import Header from "../components/Header";
import CustomerTable from "../components/admin/CustomerTable";
import Lessons from "./Lessons";
import { useEffect } from "react";

const Admin = () => {
  const { adminActions } = useParams();

  useEffect(() => {
    //console.log("action", adminActions);
  }, []);

  return (
    <>
      <Header />
      <div>
        {(adminActions === "customers" && <CustomerTable />) ||
          (adminActions === "lessons" && <Lessons />)}
      </div>
    </>
  );
};

export default Admin;
