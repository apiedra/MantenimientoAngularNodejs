CREATE OR REPLACE PROCEDURE sp_gestionar_maestro_clientes (
    pv_numero_identificacion   IN                         VARCHAR2,
    pv_nombre                  IN                         VARCHAR2,
    pv_primer_apellido         IN                         VARCHAR2,
    pv_segundo_apellido        IN                         VARCHAR2,
    pv_accion                  IN                         VARCHAR2
) IS
BEGIN
    IF pv_accion = 'I' THEN
        BEGIN
            INSERT INTO maestro_clientes (
                numero_identificacion,
                nombre,
                primer_apellido,
                segundo_apellido
            ) VALUES (
                pv_numero_identificacion,
                pv_nombre,
                pv_primer_apellido,
                pv_segundo_apellido
            );
        END;

    ELSIF pv_accion = 'D' THEN
        BEGIN
            DELETE FROM maestro_clientes
            WHERE
                numero_identificacion = pv_numero_identificacion;

        END;
    ELSIF pv_accion = 'U' THEN
        BEGIN
            UPDATE maestro_clientes
            SET
                nombre = pv_nombre,
                primer_apellido = pv_primer_apellido,
                segundo_apellido = pv_segundo_apellido
            WHERE
                numero_identificacion = pv_numero_identificacion;

        END;
    END IF;
END;
/