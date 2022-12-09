import { FC } from "react";
import "./index.scss";

type ITable = {
  datas: any;
  adminData: any[];
};

const Table: FC<ITable> = ({ datas, adminData }) => {
  return (
      <table>
        <thead>
          <tr>
            {datas &&
              datas?.data.length &&
              adminData.length &&
              adminData?.map((r: any) => (
                <th
                  style={{
                    border: "1px solid #e9edf4",
                    padding: "1rem",
                  }}
                >
                  {r.key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          <tr>
            {datas &&
              adminData &&
              adminData?.map((r: any) => (
                <td>
                  {r.val.map((y: any) => (
                    <p
                      style={{
                        border: "1px solid #e9edf4",
                        padding: "1rem",
                        backgroundColor: "white",
                      }}
                    >
                      {y}
                    </p>
                  ))}
                </td>
              ))}
          </tr>
        </tbody>
      </table>
  );
};

export default Table;
