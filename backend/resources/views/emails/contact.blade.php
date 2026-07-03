<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Nueva Solicitud de Cupo</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px;">
    
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <div style="background-color: #0f172a; padding: 25px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Nueva Solicitud Web</h2>
        </div>

        <div style="padding: 30px;">
            <p style="color: #475569; font-size: 16px; margin-top: 0; margin-bottom: 25px;">
                Has recibido una nueva solicitud desde el formulario. Aquí están los detalles del contacto:
            </p>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; width: 35%;">
                        <strong style="color: #334155;">Programa:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">
                        {{ $data['programa'] }}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #334155;">Nombre completo:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #475569;">
                        {{ $data['nombre'] }} {{ $data['apellido'] }}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <strong style="color: #334155;">Email de contacto:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                        <a href="mailto:{{ $data['email'] }}" style="color: #2563eb; text-decoration: none;">{{ $data['email'] }}</a>
                    </td>
                </tr>
            </table>

            <div style="margin-top: 30px; background-color: #f8fafc; padding: 20px; border-left: 4px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; font-weight: 600; color: #0f172a;">Mensaje / Teléfono:</p>
                <p style="margin: 0; color: #475569; line-height: 1.6; white-space: pre-line;">
                    {{ $data['mensaje'] ?? 'Sin mensaje adicional.' }}
                </p>
            </div>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                Este es un mensaje automático generado por tu plataforma web.
            </p>
        </div>

    </div>
</body>
</html>