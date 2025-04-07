import React, { useEffect } from "react";
import useCompaniesStore from "../store/useCompaniesStore";
import { NavLink } from "react-router-dom";
import { Flex, Button, Avatar, List } from "antd";

const CompaniesContainer = () => {
  const { data, loading, fetchData } = useCompaniesStore();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

        <h2>Mis empresas</h2>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/9.x/icons/svg?icon=shop`}
                  />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.location.address}
              />
            </List.Item>
          )}
        />
        <NavLink to={`/createcompany`}>
       Crear Nueva empresa
        </NavLink>
        
      
    </div>
  );
};

export default CompaniesContainer;
