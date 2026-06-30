from sqlalchemy.orm import sessionmaker
from fastapi import FastAPI, Depends, HTTPException
from database import engine, get_db
from models import Client, Servicio
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ClientSchema(BaseModel):
    nombres: str
    apellidos: str
    identificacion: str
    tipoIdentificacion: int
    fechaNacimineto: str
    numeroCelular: str
    correoElectronico: str

class ServicioSchema(BaseModel):
    identificacion: str
    fechaInicio: str
    ultimaFacturacion: str
    ultimoPago: int = 0


@app.get("/clientes")
def get_clientes(db: sessionmaker = Depends(get_db)):
    clientes = db.query(Client).all()
    return clientes

@app.post("/clientes")
def create_cliente(client: ClientSchema, db: sessionmaker = Depends(get_db)):
    db_client = Client(
        nombres=client.nombres,
        apellidos=client.apellidos,
        identificacion=client.identificacion,
        tipoIdentificacion=client.tipoIdentificacion,
        fechaNacimineto=client.fechaNacimineto,
        numeroCelular=client.numeroCelular,
        correoElectronico=client.correoElectronico
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@app.put("/clientes/{client_id}")
def update_cliente(client_id: int, client: ClientSchema, db: sessionmaker = Depends(get_db)):
    db_client = db.query(Client).filter(Client.id == client_id).first()
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    for key, value in client.model_dump().items():
        setattr(db_client, key, value)
    db.commit()
    db.refresh(db_client)
    return db_client

@app.delete("/clientes/{client_id}")
def delete_cliente(client_id: int, db: sessionmaker = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    db.delete(client)
    db.commit()
    return {"message": "Client deleted successfully"}


@app.get("/servicios")
def get_servicios(db: sessionmaker = Depends(get_db)):
    servicios = db.query(Servicio).all()
    return servicios


@app.post("/servicios")
def create_servicio(servicio: ServicioSchema, db: sessionmaker = Depends(get_db)):
    db_servicio = Servicio(
        identificacion=servicio.identificacion,
        fechaInicio=servicio.fechaInicio,
        ultimaFacturacion=servicio.ultimaFacturacion,
        ultimoPago=servicio.ultimoPago,
    )
    db.add(db_servicio)
    db.commit()
    db.refresh(db_servicio)
    return db_servicio

@app.put("/servicios/{servicio_id}")
def update_servicio(servicio_id: int, servicio: ServicioSchema, db: sessionmaker = Depends(get_db)):
     db_servicio = db.query(Servicio).filter(Servicio.id == servicio_id).first()
     if not db_servicio:
         raise HTTPException(status_code=404, detail="Servicio not found")
     for key, value in servicio.model_dump().items():
         setattr(db_servicio, key, value)
     db.commit()
     db.refresh(db_servicio)
     return db_servicio

@app.delete("/servicios/{servicio_id}")
def delete_servicio(servicio_id: int, db: sessionmaker = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id == servicio_id).first()
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio not found")
    db.delete(servicio)
    db.commit()
    return {"message": "Servicio deleted successfully"}
