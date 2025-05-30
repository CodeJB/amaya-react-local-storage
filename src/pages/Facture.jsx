import { useEffect, useState } from "react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
export default function Client() {
  const [amaya, setAmaya] = useState({});
  useEffect(() => {
    const data = localStorage.getItem("amaya");
    if (data) {
      setAmaya(JSON.parse(data));
    } else {
      // redirige
    }
  }, []);

  const effacer = (indice) => {
    const nom = amaya.facture[indice].num;
    const test = confirm(`Voulez-vous effacer  ${nom} ?`);
    if (test) {
      amaya.facture.splice(indice, 1);
      setAmaya({ ...amaya });
      localStorage.setItem("amaya", JSON.stringify(amaya));
    }
  };
  return (
    <>
      <Nav active={"facture"}></Nav>
      <div className="ps-5 container bg-light h-600">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb pt-3">
            <li className="breadcrumb-item">
              <Link
                to={`/dashboard`}
                className="link-success"
                href="/backoffice"
              >
                Home
              </Link>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Liste des factures
            </li>
          </ol>
        </nav>
        <h1>Factures</h1>
        <Link to={`/facture-ajouter`} className="btn btn-success">
          <i className="fa fa-plus"></i>
        </Link>
        <div className="col-6 mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th> # </th>
                <th> num </th>
                <th> Descriptif </th>
                <th> Year </th>
                <th> Favori </th>
                <th colSpan="2"> Actions </th>
              </tr>
            </thead>
            <tbody>
              {amaya.facture &&
                amaya.facture.map((e, indice) => (
                  <tr key={indice}>
                    <td>{indice + 1}</td>
                    <td>{e.num}</td>
                    <td>{e.name}</td>
                    <td>{e.year}</td>
                    <td>{e.fav}</td>
                    <td>
                      <Link
                        to={`/facture-modifier/${e.id}`}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => effacer(indice)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
