<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        .header { background-color: #002f6c; color: white; padding: 10px 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>¡Nuevo Prospecto Registrado!</h2>
        </div>
        <div class="content">
            <p>Se ha registrado un nuevo usuario desde el modal del sitio web:</p>
            
            <div class="field">
                <span class="label">Nombre:</span> 
                {{ $lead->nombres ?? 'No especificó nombre' }}
            </div>
            
            <div class="field">
                <span class="label">Correo Electrónico:</span> 
                <a href="mailto:{{ $lead->email }}">{{ $lead->email }}</a>
            </div>

            <div class="field">
                <span class="label">Fecha de registro:</span> 
                {{ $lead->created_at->format('d/m/Y H:i:s') }}
            </div>
        </div>
    </div>
</body>
</html>