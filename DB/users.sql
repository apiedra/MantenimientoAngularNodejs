--Tabla maestro
CREATE TABLE MAESTRO_CLIENTES

(

  numero_identificacion  VARCHAR2(30 BYTE)      NOT NULL,
  NOMBRE                 VARCHAR2(50 BYTE)      NOT NULL,
  PRIMER_APELLIDO        VARCHAR2(50 BYTE)      NOT NULL,
  SEGUNDO_APELLIDO      VARCHAR2(50 BYTE)      NOT NULL,
  CONSTRAINT CLIENTE_MAESTRO_PK PRIMARY KEY(numero_identificacion)
);


--Tabla detalle
CREATE TABLE pedido (
    numero_identificacion   VARCHAR2(30 BYTE) NOT NULL,
    id_pedido               VARCHAR2(30) NOT NULL,
    descripcion             VARCHAR2(100 BYTE) NOT NULL,
    CONSTRAINT pedido_pk PRIMARY KEY ( id_pedido),
    CONSTRAINT pedido_fk FOREIGN KEY ( numero_identificacion )
        REFERENCES maestro_clientes ( numero_identificacion )
);


