CREATE OR REPLACE PROCEDURE gestionar_pedido (
    pv_numero_identificacion   IN                VARCHAR2,
    pv_id_pedido   IN                VARCHAR2,
    pv_descripcion    IN                VARCHAR2,
    pv_accion         IN                VARCHAR2
) IS
BEGIN
    IF pv_accion = 'I' THEN
        BEGIN
            INSERT INTO PEDIDO (
                numero_identificacion,
                id_pedido,
                descripcion
            ) VALUES (
                pv_numero_identificacion,
                pv_id_pedido,
                pv_descripcion
            );
        END;

    ELSIF pv_accion = 'D' THEN
        BEGIN
            DELETE FROM PEDIDO
            WHERE
                id_pedido = pv_id_pedido;

        END;
    ELSIF pv_accion = 'U' THEN
        BEGIN
            UPDATE PEDIDO
            SET
                descripcion = pv_descripcion
            WHERE
                id_pedido = pv_id_pedido
                and numero_identificacion=pv_numero_identificacion;

        END;
    END IF;
END;
/