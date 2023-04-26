import Link from "next/link";
import React from "react";

function ReportTable({ reports }) {
  return (
    <table className="table-fixed border-collapse  border border-slate-500  mt-5">
      <thead>
        <tr className="bg-black text-white">
          <th className="p-3 border border-slate-500">Id</th>
          <th className="p-3 border border-slate-500">Incident</th>
          <th className="p-3 border border-slate-500">Description</th>
          <th className="p-3 border border-slate-500">Status</th>
        </tr>
      </thead>
      <tbody>
        {reports &&
          reports.map((report) => (
            <tr key={report.id} className="hover:bg-blue-50 hover:">
              <td className="p-3 border m-3 border-slate-500 text-blue-600">
                <Link href={`/report/${report.id}`}>{report?.id}</Link>
              </td>
              <td className="p-3 border border-slate-500">
                {report?.incident}
              </td>
              <td className="p-3 border border-slate-500">{report?.remarks}</td>
              <td className="p-3 border border-slate-500">{report?.status}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
