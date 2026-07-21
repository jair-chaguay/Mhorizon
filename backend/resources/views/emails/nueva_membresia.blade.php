
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px; }
        .header { background-color: #f97316; color: white; padding: 15px; text-align: center; border-radius: 6px 6px 0 0; }
        .content { padding: 20px 0; }
        .field { margin-bottom: 15px; border-bottom: 1px solid #f5f5f5; padding-bottom: 10px; }
        .label { font-weight: bold; color: #151e28; display: block; font-size: 13px; text-transform: uppercase; }
        .value { font-size: 16px; color: #444; margin-top: 5px; }
        .mensaje-box { background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-top: 10px; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">Nueva Solicitud de Activación de Membresía</h2>
        </div>
        
        <div class="content">
            <p>Se ha recibido una nueva solicitud de membresía desde el sitio web. Aquí están los detalles:</p>

            <div class="field">
                <span class="label">Nombre y Apellido</span>
                <div class="value">{{ $datos['nombre'] }}</div>
            </div>

            <div class="field">
                <span class="label">Empresa</span>
                <div class="value">{{ $datos['empresa'] }}</div>
            </div>

            <div class="field">
                <span class="label">Correo Corporativo</span>
                <div class="value">{{ $datos['correo'] }}</div>
            </div>

            <div class="field">
                <span class="label">WhatsApp / Teléfono</span>
                <div class="value">{{ $datos['telefono'] }}</div>
            </div>

            <div class="field">
                <span class="label">Ciudad</span>
                <div class="value">{{ $datos['ciudad'] }}</div>
            </div>

            <div class="field">
                <span class="label">Perfil / Cargo</span>
                <div class="value">{{ $datos['perfil'] }}</div>
            </div>

            <div class="field">
                <span class="label">Mensaje Adicional</span>
                @if(!empty($datos['mensaje']))
                    <div class="mensaje-box">{{ $datos['mensaje'] }}</div>
                @else
                    <div class="value" style="color: #888;">El usuario no dejó ningún mensaje.</div>
                @endif
            </div>
        </div>
    </div>
</body>
</html>