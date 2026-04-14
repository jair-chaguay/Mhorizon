<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Obligación Cumplida</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #10B981; text-align: center;">✅ Obligación Cumplida Exitosamente</h2>
        
        <p>Hola,</p>
        <p>Se ha subido el documento final correspondiente a la siguiente obligación tributaria en la Intranet Operativa:</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Cliente:</strong> {{ $obligacion->cliente->razon_social_nombres }}</p>
            <p style="margin: 5px 0;"><strong>RUC/Cédula:</strong> {{ $obligacion->cliente->identificacion }}</p>
            <p style="margin: 5px 0;"><strong>Tipo de Impuesto:</strong> <span style="color: #F97316; font-weight: bold;">{{ $obligacion->tipo_impuesto }}</span></p>
            <p style="margin: 5px 0;"><strong>Periodo Correspondiente:</strong> {{ $obligacion->fecha_presentacion }}</p>
            <p style="margin: 5px 0;"><strong>Fecha de Subida:</strong> {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}</p>
        </div>

        <p>El estado de esta obligación ha cambiado a <strong>Presentado</strong>. Las alertas de vencimiento para este documento han sido desactivadas automáticamente.</p>
        
        <hr style="border-top: 1px solid #eee; margin-top: 30px;">
        <p style="font-size: 12px; color: #888; text-align: center;">Este es un mensaje automático de la Intranet MHORIZON. Por favor, no responder.</p>
    </div>
</body>
</html>