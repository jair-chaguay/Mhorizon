<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #f97316; color: white; padding: 10px 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { padding: 20px; background-color: #f8fafc; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e293b; }
        .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nueva Solicitud de Sesión Estratégica</h2>
        </div>
        <div class="content">
            <p>Se ha recibido un nuevo mensaje desde el formulario web de la calculadora/soluciones:</p>
            
            <div class="field">
                <span class="label">Nombre completo:</span> 
                {{ $mensajeContacto->nombre }} {{ $mensajeContacto->apellido }}
            </div>
            
            <div class="field">
                <span class="label">Correo Electrónico:</span> 
                <a href="mailto:{{ $mensajeContacto->correo }}">{{ $mensajeContacto->correo }}</a>
            </div>
            
            <div class="field">
                <span class="label">Mensaje:</span> 
                <p style="background: #fff; padding: 10px; border-left: 4px solid #f97316; border-radius: 4px;">
                    {{ $mensajeContacto->mensaje ?: 'No dejó mensaje adicional.' }}
                </p>
            </div>
        </div>
        <div class="footer">
            <p>Este es un correo automático generado por el sistema Gestor Tributario de Mhorizon.</p>
        </div>
    </div>
</body>
</html>