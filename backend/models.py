from sqlalchemy import Column, Integer, String
from database import Base

class Client(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombres = Column(String, unique=True, index=True, nullable=False)
    apellidos= Column(String, index=True, nullable=False)
    identificacion = Column(String, unique=True, index=True, nullable=False)
    tipoIdentificacion = Column(Integer, index=True, nullable=False)
    fechaNacimineto = Column(String, index=True, nullable=False)
    numeroCelular = Column(String, index=True, nullable=False)
    correoElectronico = Column(String, index=True, nullable=False)

class Servicio(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    identificacion = Column(String, unique=True, index=True, nullable=False)
    fechaInicio = Column(String, index=True, nullable=False)
    ultimaFacturacion = Column(String, index=True, nullable=False)
    ultimoPago = Column(Integer, index=True, nullable=False, default=0)
    