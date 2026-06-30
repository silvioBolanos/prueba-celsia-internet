import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    numeroCelular: "",
    correoElectronico: "",
    servicioId: "",
    identificacion: "",
    tipoIdentificacion: "",
    fechaNacimineto: "",
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${API_URL}/clientes`);
        setClientes(response.data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    const fetchServicios = async () => {
      try {
        const response = await axios.get(`${API_URL}/servicios`);
        setServicios(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };

    fetchClientes();
    fetchServicios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        identificacion: formData.identificacion,
        tipoIdentificacion: formData.tipoIdentificacion
          ? Number(formData.tipoIdentificacion)
          : null,
        fechaNacimineto: formData.fechaNacimineto,
        correoElectronico: formData.correoElectronico,
        numeroCelular: formData.numeroCelular,
        // servicioId: formData.servicioId ? Number(formData.servicioId) : null,
      };

      const response = await axios.post(`${API_URL}/clientes`, payload);
      setClientes((prev) => [...prev, response.data]);
      setFormData({
        nombres: "",
        apellidos: "",
        identificacion: "",
        tipoIdentificacion: "",
        numeroCelular: "",
        fechaNacimineto: "",
        correoElectronico: "",
        // servicioId: "",
      });
    } catch (error) {
      console.error("Error creando cliente:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="header">
        <h1>Crear cliente y contratar servicio</h1>
      </div>
      <div className="content-body">
        <div className="form-container">
          <div className="title-form">Formulario de cliente</div>
          <form onSubmit={handleSubmit} className="cliente-form">
            <div>
              <label htmlFor="nombres">Nombres</label>
              <input
                id="nombres"
                name="nombres"
                type="text"
                value={formData.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="tipoIdentificacion">Tipo de identificación</label>
              <select
                id="tipoIdentificacion"
                name="tipoIdentificacion"
                value={formData.tipoIdentificacion}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccione un tipo --</option>
                <option value="1">Cédula de ciudadanía</option>
                <option value="2">Tarjeta de identidad</option>
                <option value="3">Registro civil</option>
                <option value="4">Cédula de extranjería</option>
              </select>
            </div>

            <div>
              <label htmlFor="identificacion">Identificación</label>
              <input
                id="identificacion"
                name="identificacion"
                type="text"
                value={formData.identificacion}
                onChange={handleChange}
                required
              />
            </div>

            <div htmlFor="fechaNacimineto">Fecha de nacimiento</div>
            <input
              id="fechaNacimineto"
              name="fechaNacimineto"
              type="date"
              value={formData.fechaNacimineto}
              onChange={handleChange}
              required
            />

            <div>
              <label htmlFor="numeroCelular">Número celular</label>
              <input
                id="numeroCelular"
                name="numeroCelular"
                type="tel"
                value={formData.numeroCelular}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="correoElectronico">Correo electrónico</label>
              <input
                id="correoElectronico"
                name="correoElectronico"
                type="email"
                value={formData.correoElectronico}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="servicioId">Seleccionar servicio</label>
              <select
                id="servicioId"
                name="servicioId"
                value={formData.servicioId}
                onChange={handleChange}
              >
                <option value="">-- Seleccione un servicio --</option>
                <option value="1">Internet 200 MB</option>
                <option value="2">Internet 400 MB</option>
                <option value="3">Internet 600 MB</option>
                <option value="4">DirecTv Go</option>
                <option value="5">Paramount+</option>
              </select>
            </div>

            <button type="submit">Crear cliente</button>
          </form>
        </div>

        <div className="info-container">
          <h3>Clientes</h3>
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.identificacion}>
                {cliente.nombres} {cliente.apellidos} - {cliente.numeroCelular}{" "}
                - {cliente.correoElectronico}
              </li>
            ))}
          </ul>
        </div>

        <div className="info-container">
          <h3>Servicios disponibles</h3>
          <ul>
            <li>Internet 200 MB</li>
            <li>Internet 400 MB</li>
            <li>Internet 600 MB</li>
            <li>DirecTv Go</li>
            <li>Paramount+</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
